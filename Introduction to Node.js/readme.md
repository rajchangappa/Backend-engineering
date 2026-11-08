# Node.js, Runtime Environments & npm

## 1. What is Node.js?

**Node.js** is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser.

- **The Core Premise:** Traditionally, JavaScript lived exclusively inside web browsers to make web pages interactive. In 2009, Ryan Dahl extracted Google Chrome’s **V8 JavaScript engine**, combined it with a C++ library called **libuv**, and created Node.js—allowing developers to run JavaScript directly on computers, servers, and backend systems.
- **Why it matters:** It enabled **"Full-Stack JavaScript"**—allowing engineers to write frontend web interfaces and backend server APIs using a single programming language.

---

## 2. How Node.js Works Under the Hood

Node.js operates on a **Single-Threaded, Event-Driven, Non-Blocking I/O Architecture**.

### Key Architectural Pillars

- **V8 Engine:** Google’s high-performance C++ engine that parses JavaScript and compiles it directly into native machine code.
- **The Call Stack (Single-Threaded):** Node executes your main JavaScript code on a single thread, processing operations sequentially.
- **Non-Blocking I/O (Input/Output):** Operations like reading files, querying databases, or making HTTP requests do not freeze the main thread. Node delegates these slow tasks to the underlying OS or a background thread pool managed by `libuv`.
- **The Event Loop:** The heart of Node.js. It continuously monitors the Call Stack and the Task Queue. When background tasks complete, their callback functions are pushed to the Queue, and the Event Loop pushes them back onto the Call Stack when it's clear.

> **Analogy:** Think of Node.js as a fast-casual restaurant with a single cashier (the Call Stack). Instead of standing around waiting while the kitchen prepares an order (Blocking I/O), the cashier takes your order, gives you a buzzer (Callback), and immediately serves the next customer. When your food is ready (Event Loop), the buzzer goes off and you collect your meal.

---

## 3. How Node.js Differs from a Web Browser

While both run JavaScript via an engine (like V8), their **runtimes** provide completely different capabilities and environments.

| Feature / Aspect     | Web Browser                                                      | Node.js Environment                                                    |
| -------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Primary Purpose**  | Rendering user interfaces & user interaction                     | Server-side logic, APIs, background processing, scripts                |
| **Global Object**    | `window` (or `document`)                                         | `global` (or `process`)                                                |
| **DOM / UI Access**  | Access to `document`, `window`, HTML elements                    | **No DOM access** (`document` is `undefined`)                          |
| **System Access**    | Restricted for security (cannot freely access local file system) | Full OS access (read/write local files, inspect environment variables) |
| **Standard Modules** | Browser Web APIs (`fetch`, `localStorage`, `canvas`)             | Core Node Modules (`fs`, `path`, `http`, `crypto`, `os`)               |
| **Module Systems**   | ES Modules (`import / export`)                                   | CommonJS (`require / module.exports`) & ES Modules                     |

---

## 4. Browser JS vs. Node.js (Quick Comparison)

- **Browser JavaScript** focuses on **User Experience**: capturing clicks, manipulating HTML/CSS, fetching data from APIs, and animating elements safely inside a sandboxed environment.
- **Node.js JavaScript** focuses on **System & Backend Operations**: handling HTTP requests from thousands of clients simultaneously, reading/writing files on server disks, interacting with databases, and managing server hardware.

---

## 5. What is npm?

**npm** stands for **Node Package Manager**. It is installed automatically alongside Node.js and consists of two core components:

1. **An Online Registry:** A massive public database of open-source JavaScript packages (libraries, tools, frameworks) contributed by developers worldwide.
2. **A Command-Line Interface (CLI):** A tool that allows you to install, update, and manage third-party dependencies in your projects via your terminal.

### Essential Manifest Files

- **`package.json`:** The configuration blueprint for your project. It lists project details, scripts, and installed dependencies (e.g., `express`, `lodash`).
- **`package-lock.json`:** The exact version tree lockfile ensuring that every developer (or production server) installs the exact same dependency versions.
- **`node_modules/`:** The local directory where downloaded npm package files reside.

---

## Things to Know About the Node.js `process` Object

The **`process`** object is a global feature in Node.js that provides information about and control over the current execution environment.

- **`process.argv`**: An array containing command-line arguments passed when running your script. Index `0` is the Node executable path, `1` is the script path, and index `2` onwards are your custom inputs.
- **`process.version`**: A string showing the active Node.js version (e.g., `v20.11.0`), useful for compatibility checks.
- **`process.platform`**: Identifies the underlying operating system (e.g., `'win32'`, `'darwin'`, `'linux'`), enabling OS-specific logic.
- **`process.cwd()`**: A method returning the Current Working Directory—the exact folder path from where the process was launched.
