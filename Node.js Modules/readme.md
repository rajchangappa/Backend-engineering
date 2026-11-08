# Modules in Node.js

## 1. What are Node.js Modules?

A **module** is an encapsulated, reusable block of code contained within its own file. By default, everything inside a Node.js file is private—variables, functions, and classes cannot be accessed from outside unless explicitly exported.

---

## 2. Why Are Modules Used?

- **Encapsulation & Scope:** Prevents global namespace pollution by keeping variables isolated to their own files.
- **Reusability:** Write a utility function or component once and import it across multiple files or projects.
- **Maintainability:** Breaks large, complex applications into clean, logical, and testable files (separation of concerns).

---

## 3. Module System Types

Node.js supports two distinct systems for loading and sharing code:

- **CommonJS (CJS):** Node's traditional, synchronous module system.
  - _Syntax:_ Uses `require()` to import and `module.exports` to export. (This is the default in Node.js).
  - _Example:_

    ```javascript
    // math.js
    const add = (a, b) => a + b;
    module.exports = { add };

    // app.js
    const { add } = require("./math");
    ```

- **ES Modules (ESM):** The modern, official JavaScript standard supporting asynchronous loading.
  - _Syntax:_ Uses `import` and `export`. Enabled by setting `"type": "module"` in your `package.json`.
  - _Example:_

    ```javascript
    // math.js
    export const add = (a, b) => a + b;

    // app.js
    import { add } from "./math.js";
    ```

---

## 4. The Three Types of Modules in Node.js

1. **Core (Built-in) Modules:** Ships directly with Node.js out of the box (e.g., `fs`, `path`, `http`). No installation required; just require/import them.
2. **Local Modules:** Custom files and folders written by you inside your application.
3. **Third-Party Modules:** Open-source packages created by the community and downloaded via npm (e.g., `express`, `lodash`).

---

## 5. Important Core Modules with Examples

### A. The `path` Module

Crucial for handling and normalizing file paths safely across different operating systems (since Windows uses `\` while macOS/Linux use `/`).

```javascript
const path = require("path");
// Joins paths correctly regardless of the OS
const filePath = path.join(__dirname, "data", "config.json");
```

### B. The `fs` (File System) Module

Allows Node.js to interact directly with the computer's hard drive to read, write, update, and delete files.

```javascript
const fs = require("fs");
// Synchronously write data to a file
fs.writeFileSync("note.txt", "Learning Node.js modules!");
```

### C. The `http` Module

Provides networking capabilities to build low-level web servers and handle network requests.

```javascript
const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from the Node.js server!");
});
server.listen(3000);
```
