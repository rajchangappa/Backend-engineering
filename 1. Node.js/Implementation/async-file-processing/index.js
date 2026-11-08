import { readFile, writeFile } from "node:fs/promises";

// Synchronous execution
console.log("--- Synchronous execution ---");
console.log("First");
console.log("Second");
console.log("Third");

// Asynchronous execution
console.log("--- Asynchronous execution ---");
console.log("start");

setTimeout(() => {
  console.log("Async operation");
}, 1000);

console.log("end");

// File-system operations
async function operation() {
  await writeFile("data.txt", "Learning Node.js");
  await writeFile("data2.txt", "Learning Backend engineering");
  await writeFile("data3.txt", "Learning Full-stack engineering");

  executeRead();
}

operation();

console.log("--- File-system promise ---");
async function executeRead() {
  const [data, data2, data3] = await Promise.all([
    readFile("data.txt", "utf-8"),
    readFile("data2.txt", "utf-8"),
    readFile("data3.txt", "utf-8"),
  ]);

  setTimeout(() => {
    console.log(data);
    console.log(data2);
    console.log(data3);
  }, 2000);
}
