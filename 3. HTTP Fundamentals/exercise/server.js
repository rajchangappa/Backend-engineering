// HTTP server using Node.js
const http = require("http");
const users = [
  { name: "Monkey D Luffy", age: 19 },
  { name: "Uzumaki Naruto", age: 20 },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  // GET METHODS AND ROUTES
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Backend server is running" }));
    return;
  }

  if (req.method === "GET" && req.url === "/users") {
    res.writeHead(200);
    res.end(JSON.stringify(users));
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
