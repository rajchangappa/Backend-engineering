# Advanced HTTP: Security, Performance, and Caching

## Contents

- [Security & Transport Layer](#1-security--transport-layer-https-tls--keep-alive)
- [Cross-Origin Security & State Management](#2-cross-origin-security--state-management)
- [HTTP Caching Mechanics](#3-http-caching-mechanics)

---

## 1. Security & Transport Layer (HTTPS, TLS, & Keep-Alive)

Standard HTTP transmits data in plain text, making it vulnerable to interception. **HTTPS** secures this by wrapping HTTP inside **TLS (Transport Layer Security)**. A cryptographic handshake establishes encrypted symmetric keys before any HTTP application data flows.

- **Keep-Alive Connections:** Under HTTP/1.1, the `Connection: keep-alive` header instructs servers to keep the underlying TCP socket open after a response, allowing multiple request-response cycles to reuse the same connection and eliminate repeated connection overhead.

- **Compression:** To optimize bandwidth, clients send `Accept-Encoding: gzip, br`. Servers compress text-based payloads using algorithms like **gzip** or **Brotli (`br`)**, shrinking file sizes before network transmission.

## 2. Cross-Origin Security & State Management

- **CORS & Preflight:** The Same-Origin Policy blocks malicious cross-site data theft. For complex mutations or custom headers, the browser automatically sends an `OPTIONS` **preflight request** to query server permissions. The server replies with headers like `Access-Control-Allow-Origin: [https://client.com](https://client.com)`.

- **Cookies & Headers:** Because HTTP is stateless, servers use the `Set-Cookie` response header to issue persistent identifiers. Subsequent requests include the `Cookie` header automatically. Security flags like `HttpOnly` prevent JavaScript access (mitigating XSS), while `Secure` restricts transmission to encrypted channels.

## 3. HTTP Caching Mechanics

Caching prevents redundant network round-trips by storing local copies of responses.

- **`Cache-Control`:** The core header governing caching rules. For example, `Cache-Control: public, max-age=86400` instructs browsers and intermediaries to reuse a resource for 24 hours without contacting the origin server.

- **Validation Headers (`ETag` & `Last-Modified`):** When a cache expires, clients validate freshness using conditional headers:
  - `Last-Modified`: A timestamp indicating resource modification time.
  - `ETag`: A cryptographic hash of the resource state (e.g., `ETag: "a8f9c2"`).

- **Conditional Requests:** The client sends the cached ETag back via `If-None-Match: "a8f9c2"`. If the server resource hasn't changed, it returns **`304 Not Modified`** with an empty body, saving significant bandwidth.
