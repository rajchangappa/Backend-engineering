# How the Internet Works

The **Internet** is a global network of interconnected computers communicating through standardized protocols like TCP/IP. It relies on a client-server architecture where devices request and receive data. Unique IP addresses identify connected hardware, while the Domain Name System (DNS) translates human-readable web addresses into numeric locations, enabling instant data transmission worldwide.

Building seamlessly on our understanding of how software runs on local machines and backend environments, we now zoom out to the global scale: **How the Internet really works.**

When you type a web address into your browser and press Enter, a meticulously orchestrated sequence of networking protocols, hardware handshakes, and routing decisions occurs in milliseconds. Here is the step-by-step journey of a web request.

## Follow the Journey

1. [Start with the client and server](#1-the-webs-request-and-response-foundation)
2. [Find the destination with IP addresses and ports](#2-finding-the-right-destination-ip-addresses-and-ports)
3. [Look up the domain with DNS](#3-turning-domain-names-into-ip-addresses-dns-resolution)
4. [Reach the host and web server](#4-where-websites-live-hosting-and-web-servers)
5. [Choose a transport protocol](#5-choosing-how-data-travels-tcp-vs-udp)
6. [Establish a TCP connection](#6-opening-a-tcp-connection-the-3-way-handshake)
7. [Exchange data with HTTP or HTTPS](#7-sending-web-requests-http-over-tcp-and-https-over-tls)
8. [Route traffic through a reverse proxy](#8-managing-incoming-traffic-reverse-proxies)

---

## 1. The Web's Request-and-Response Foundation

At the foundation of the web is the **Client-Server Model**, a two-party relationship:

- **The Client:** Your device (browser, mobile app, or script) that initiates a request for information.
- **The Server:** A powerful, always-on remote computer housed in a data center that listens for requests, processes business logic, and returns the requested data (HTML, JSON, images).

## 2. Finding the Right Destination: IP Addresses and Ports

Once a client wants to talk to a server, it needs to know _where_ to send the data:

- **IP Address (Internet Protocol):** A unique numerical label assigned to every device connected to the internet (e.g., IPv4 like `192.0.2.1` or IPv6). Think of it as the physical mailing address of a house.
- **Ports:** A server might run multiple applications simultaneously. A **port** is like an apartment or room number inside that house that directs traffic to the correct service. For example, standard web traffic uses **Port 80** (HTTP) or **Port 443** (HTTPS), while a database might sit on Port 5432.

## 3. Turning Domain Names into IP Addresses: DNS Resolution

Humans cannot easily memorize raw IP addresses, so we use domain names like `google.com`. **DNS** is the phonebook of the internet:

1. Your browser checks its local cache to see if it already knows the IP address for `google.com`.
2. If not, it queries a **DNS Resolver** (usually managed by your Internet Service Provider or a service like Cloudflare `1.1.1.1`).
3. The resolver cascades through **Root Servers**, **TLD (.com) Servers**, and **Authoritative Name Servers** until it finds the exact IP address linked to that domain name and returns it to your browser.

## 4. Where Websites Live: Hosting and Web Servers

With the IP address in hand, your browser reaches out to the server's physical home:

- **Hosting:** The service of renting or maintaining server hardware connected to the internet 24/7.
- **Web Server Software:** Programs like Nginx, Apache, or Node.js running on that server that listen to specific ports, accept incoming requests, and decide how to fulfill them (serving static HTML files or forwarding requests to backend code).

## 5. Choosing How Data Travels: TCP vs. UDP

To send data packets across the network, computers rely on transport layer protocols:

- **TCP (Transmission Control Protocol):** Connection-oriented, highly reliable, and guarantees that packets arrive in the correct order without loss (used for web pages, emails, file transfers). If a packet drops, TCP asks for it to be resent.
- **UDP (User Datagram Protocol):** Connectionless, extremely fast, but drop-tolerant (used for live video streaming, online gaming, and VoIP). If a packet drops, UDP ignores it and moves on.

## 6. Opening a TCP Connection: The 3-Way Handshake

Before any web data is transmitted over TCP, the client and server establish trust and synchronization using a **3-Way Handshake**:

1. **SYN (Synchronize):** The client sends a packet to the server saying, _"I want to open a connection."_
2. **SYN-ACK (Synchronize-Acknowledge):** The server replies, _"I hear you, and I am ready to open a connection too."_
3. **ACK (Acknowledge):** The client responds, _"Received! Connection established."_

## 7. Sending Web Requests: HTTP over TCP and HTTPS over TLS

Once the TCP tunnel is open, applications speak to each other using protocols:

- **HTTP (Hypertext Transfer Protocol):** The plain-text language clients and servers use to exchange data (GET, POST requests, headers, and status codes like 200 OK or 404 Not Found).
- **HTTPS over TLS:** Because raw HTTP can be intercepted, modern web traffic wraps HTTP inside **TLS (Transport Layer Security)**. A cryptographic handshake occurs immediately after the TCP handshake to encrypt all transmitted data, ensuring privacy, data integrity, and server authentication.

---

## 8. Managing Incoming Traffic: Reverse Proxies

In production architectures, traffic rarely hits a web server directly. Instead, it hits a **Reverse Proxy** (such as Nginx or Cloudflare) sitting _in front_ of your backend servers:

- **What it does:** It acts as a traffic cop. It handles SSL encryption termination, caches static assets, defends against DDoS attacks, and distributes incoming requests across multiple backend servers (**load balancing**) so no single server gets overwhelmed.
