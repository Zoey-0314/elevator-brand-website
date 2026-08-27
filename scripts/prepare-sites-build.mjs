import { copyFile } from "node:fs/promises";

const source = new URL("../dist/server/index.js", import.meta.url);
const target = new URL("../dist/server/index.mjs", import.meta.url);

await copyFile(source, target);

const worker = await import(target.href);
if (typeof worker.default?.fetch !== "function") {
  throw new TypeError(
    "Sites build entry must default-export an object with a fetch(request, env, ctx) method.",
  );
}

console.log("Verified Sites Worker entry: dist/server/index.mjs");
