import { greet } from "./greeting.js";

const name = process.argv[2] ?? "Monkey D Luffy";

console.log(greet(name));

console.log("Node.js version:", process.version);

console.log("Operating system:", process.platform);

console.log("Working directory:", process.cwd());

console.log(process.argv);
