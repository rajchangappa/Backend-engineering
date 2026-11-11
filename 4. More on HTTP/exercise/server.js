// HTTP server using Node.js
const http = require("http");
const crypto = require("crypto"); // Required for generating ETag hashes

const users = [
  { name: "Monkey D Luffy", age: 19 },
  { name: "Uzumaki Naruto", age: 20 },
];

const server = http.createServer((req, res) => {
  // CORS Response Headers (applied globally)
  res.setHeader("Acess-Control-AllowOrigin", "*");
  res.setHeader("Acess-Control-AllowOrigin", "GET, POST, OPTIONS");
  res.setHeader("Acess-Control-AllowOrigin", "Content-Type, If-None-Match");

  // OPTIONS pre-flight response
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  res.setHeader("Content-Type", "application/json");

  // GET METHODS AND ROUTES
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Backend server is running" }));
    return;
  }

  if (req.method === "GET" && req.url === "/users") {
    const responseBody = JSON.stringify(users);

    // ETag Generation & Cache-Control Headers
    const hash = crypto.createHash("sha1").update(responseBody).digest("hex");
    const etagValue = `"${hash}"`;

    res.setHeader("ETag", etagValue);
    res.setHeader("Cache-Control", "public, max-age=60");

    // Conditional GET using If-None-Match (HTTP 304 Not Modified)
    if (req.headers["if-none-match"] === etagValue) {
      res.writeHead(304);
      res.end();
      return;
    }

    res.writeHead(200);
    res.end(responseBody);
    return;
  }

  // POST METHOD
  if (req.method === "POST" && req.url === "/users") {
    const payloadChunks = [];

    req.on("data", (chunk) => {
      payloadChunks.push(chunk);
    });

    req.on("end", () => {
      const payload = Buffer.concat(payloadChunks).toString();

      try {
        const parsedPayload = JSON.parse(payload);
        users.push(parsedPayload);

        res.writeHead(201);
        res.end(
          JSON.stringify({
            status: "Success",
            message: users,
          }),
        );
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            status: "Error",
            message: "Invalid JSON format sent in request body.",
          }),
        );
      }
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Route Not found" }));
});

server.listen(3000, () =>
  console.log("Server running at http://localhost:3000"),
);
