package handlers

import "testing"

func TestValidEmail(t *testing.T) {
	cases := []struct {
		name string
		in   string
		ok   bool
	}{
		{"good", "user@example.com", true},
		{"trim + lowercase", "  User@Example.COM  ", true},
		{"missing at", "userexample.com", false},
		{"missing dot", "user@example", false},
		{"empty", "", false},
		{"spaces", "u ser@example.com", false},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			_, ok := validEmail(c.in)
			if ok != c.ok {
				t.Fatalf("validEmail(%q) = %v, want %v", c.in, ok, c.ok)
			}
		})
	}
}
