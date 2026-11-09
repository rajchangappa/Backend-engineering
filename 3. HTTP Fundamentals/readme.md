# HTTP Fundamentals

## Overview & Mechanics

HTTP (Hypertext Transfer Protocol) is an application-layer protocol governing data exchange on the web. It operates on a **client-server model** via a request-response cycle: a client (like a browser) sends a request containing a method (e.g., `GET`, `POST`), headers, and a URI (Uniform Resource Identifier is a string of characters that identifies a web resource using the Hypertext Transfer Protocol), while the server processes it and returns a response containing a status code (e.g., `200 OK`, `404 Not Found`) and data.

### Stateless Communication

HTTP is inherently **stateless**, meaning each request-response pair is independent. The server retains no memory of previous requests from the same client. While this makes scaling effortless, applications requiring user sessions rely on mechanisms like cookies or tokens (e.g., JWT) to maintain state.

### Evolution of HTTP Versions

- **HTTP/1.0:** Opened a new TCP connection for every single asset, causing massive latency.
- **HTTP/1.1:** Introduced **persistent connections** (`Keep-Alive`) to reuse TCP connections, plus pipelining.
- **HTTP/2:** Switched to a **binary framing layer** instead of plain text. Enabled **multiplexing** (concurrent requests over a single TCP connection) and header compression to solve latency bottlenecks.
- **HTTP/3:** Replaced TCP with **QUIC (built on UDP)**. It solves transport-layer head-of-line blocking, ensuring packet loss on one stream doesn't halt others.

---

## HTTP Requests and Responses

The web operates via a structured message exchange between client and server:

- **Request:** Sent by a client. It consists of a start line (method and path), **headers** (metadata), and an optional **body** (data payload).
- **Response:** Sent back by a server. It consists of a status code (indicating success or failure), **headers**, and an optional **body** containing the requested resource (e.g., JSON, HTML).

### HTTP Headers

Headers are key-value pairs that supply critical context for routing, security, and content formatting.

_Example Request Headers:_

```http
GET /users/42 HTTP/1.1
Host: api.example.com
Authorization: Bearer token123
Accept: application/json

```

- `Host`: Specifies the target domain.
- `Authorization`: Passes credentials to authenticate the client.
- `Accept`: Informs the server that the client expects a JSON response.

### HTTP Methods & Idempotency

HTTP methods define the action to be performed. A foundational concept here is **idempotency**: an operation is idempotent if executing it multiple times yields the exact same server-side state as executing it once.

- **Idempotent Methods (Safe to retry):**
  - `GET`: Retrieves a resource without modifying server state.
  - `PUT`: Replaces or creates a resource at a specific URI; repeating it overwrites with the same data.
  - `DELETE`: Removes a resource; repeating it leaves the resource gone (same final state).

- **Non-Idempotent Methods:**
  - `POST`: Creates a new resource. Repeating it creates duplicate entries (e.g., submitting an order twice).
  - `PATCH`: Applies partial modifications; repeating it can change state cumulatively.

---

## CORS And OPTIONS

Building on HTTP methods, browsers enforce the **Same-Origin Policy**, blocking web scripts from fetching resources from a different domain (origin) for security. **CORS (Cross-Origin Resource Sharing)** is the mechanism that safely relaxes this restriction.

When an application makes a "non-simple" request (e.g., sending JSON via `POST` or custom headers), the browser triggers an automatic **preflight request** using the **`OPTIONS` method** before the actual request is sent.

- **Purpose:** An idempotent, safe HTTP method used to query a server regarding what methods, headers, and origins are permitted for a resource.
- **Behavior:** The server responds with permission headers without executing or altering any application state.

### How CORS Works via Preflight

1. **Preflight Request:** The browser asks permission automatically:

```http
OPTIONS /api/data HTTP/1.1
Origin: https://frontend.com
Access-Control-Request-Method: POST

```

2. **Server Response:** The server replies with CORS policy headers:

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Methods: POST, GET, OPTIONS

```

3. **Actual Request:** If permitted, the browser proceeds with the real request.

---

## Request & Response Bodies

While headers supply metadata, the **body** carries the actual data payload. A `POST` or `PUT` request body sends information (such as user input or JSON payloads) to the server. Conversely, the response body contains the server's output, such as queried records, HTML pages, or error details.

**The HTTP Request (Client $\rightarrow$ Server)**

```http
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json

{
  "username": "alex_dev",
  "email": "alex@example.com",
  "role": "developer"
}
```

**TThe HTTP Response (Server $\rightarrow$ Client)**

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/users/1048

{
  "id": 1048,
  "username": "alex_dev",
  "email": "alex@example.com",
  "role": "developer",
  "createdAt": "2026-11-09T19:38:00Z"
}
```

### Content-Type vs. Accept Headers

These headers handle content negotiation between client and server:

- **`Content-Type`**: Informs the receiver what format the _attached body_ is in (e.g., `application/json` or `text/html`).
- **`Accept`**: Informs the server what format the client _prefers_ to receive in response.

### HTTP Status Codes

Status codes are three-digit numbers returned by the server indicating the outcome of a request, grouped into five classes:

| Class   | Category      | Common Examples & Meaning                                                   |
| ------- | ------------- | --------------------------------------------------------------------------- |
| **1xx** | Informational | `100 Continue` — Request received, processing continues.                    |
| **2xx** | Success       | `200 OK` (Standard success), `201 Created` (Resource successfully created). |
| **3xx** | Redirection   | `301 Moved Permanently`, `304 Not Modified` (Use cached version).           |
| **4xx** | Client Error  | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`.    |
| **5xx** | Server Error  | `500 Internal Server Error`, `503 Service Unavailable`.                     |
