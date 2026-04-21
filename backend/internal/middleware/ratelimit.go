package middleware

import (
	"encoding/json"
	"net/http"
	"strings"
	"sync"
	"time"

	"golang.org/x/time/rate"
)

type ipBucket struct {
	limiter  *rate.Limiter
	lastSeen time.Time
}

// IPRateLimiter keeps a per-IP token bucket. Buckets idle >30min are reaped.
type IPRateLimiter struct {
	mu      sync.Mutex
	buckets map[string]*ipBucket
	rate    rate.Limit
	burst   int
}

func NewIPRateLimiter(r rate.Limit, burst int) *IPRateLimiter {
	lim := &IPRateLimiter{
		buckets: make(map[string]*ipBucket),
		rate:    r,
		burst:   burst,
	}
	go lim.reap()
	return lim
}

func (i *IPRateLimiter) reap() {
	for range time.Tick(10 * time.Minute) {
		cutoff := time.Now().Add(-30 * time.Minute)
		i.mu.Lock()
		for ip, b := range i.buckets {
			if b.lastSeen.Before(cutoff) {
				delete(i.buckets, ip)
			}
		}
		i.mu.Unlock()
	}
}

func (i *IPRateLimiter) get(ip string) *rate.Limiter {
	i.mu.Lock()
	defer i.mu.Unlock()
	b, ok := i.buckets[ip]
	if !ok {
		b = &ipBucket{limiter: rate.NewLimiter(i.rate, i.burst)}
		i.buckets[ip] = b
	}
	b.lastSeen = time.Now()
	return b.limiter
}

// RateLimit returns middleware that rejects requests exceeding the per-IP bucket
// with 429 Too Many Requests.
func RateLimit(lim *IPRateLimiter) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if !lim.get(clientIP(r)).Allow() {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusTooManyRequests)
				_ = json.NewEncoder(w).Encode(map[string]string{"error": "too many requests"})
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

func clientIP(r *http.Request) string {
	// chi's RealIP middleware has already rewritten RemoteAddr to the real IP
	// when running behind a trusted proxy. Strip the port if present.
	addr := r.RemoteAddr
	if i := strings.LastIndex(addr, ":"); i != -1 {
		return addr[:i]
	}
	return addr
}
