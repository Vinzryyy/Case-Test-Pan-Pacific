package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"golang.org/x/time/rate"
)

func TestRateLimit_AllowsBurstThenBlocks(t *testing.T) {
	// 1 token per hour, burst of 2. First 2 requests pass, 3rd is blocked.
	lim := NewIPRateLimiter(rate.Every(time.Hour), 2)
	h := RateLimit(lim)(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	call := func() int {
		req := httptest.NewRequest(http.MethodPost, "/", nil)
		req.RemoteAddr = "1.2.3.4:5678"
		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, req)
		return rec.Code
	}

	if got := call(); got != http.StatusOK {
		t.Fatalf("req 1: got %d, want 200", got)
	}
	if got := call(); got != http.StatusOK {
		t.Fatalf("req 2: got %d, want 200", got)
	}
	if got := call(); got != http.StatusTooManyRequests {
		t.Fatalf("req 3: got %d, want 429", got)
	}
}

func TestRateLimit_IsolatesByIP(t *testing.T) {
	lim := NewIPRateLimiter(rate.Every(time.Hour), 1)
	h := RateLimit(lim)(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	call := func(ip string) int {
		req := httptest.NewRequest(http.MethodPost, "/", nil)
		req.RemoteAddr = ip + ":1234"
		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, req)
		return rec.Code
	}

	if got := call("1.1.1.1"); got != http.StatusOK {
		t.Fatalf("IP A req 1: got %d, want 200", got)
	}
	if got := call("1.1.1.1"); got != http.StatusTooManyRequests {
		t.Fatalf("IP A req 2: got %d, want 429", got)
	}
	// A different IP still has a fresh bucket.
	if got := call("2.2.2.2"); got != http.StatusOK {
		t.Fatalf("IP B req 1: got %d, want 200", got)
	}
}
