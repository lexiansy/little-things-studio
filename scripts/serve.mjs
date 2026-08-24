import { createReadStream } from "node:fs";
import { lstat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const argumentsByName = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  const name = process.argv[index];
  const value = process.argv[index + 1];
  if (!/^--(?:host|port|root)$/.test(name) || value == null) throw new Error(`Unsupported preview option: ${name}`);
  argumentsByName.set(name.slice(2), value);
}
const root = path.resolve(argumentsByName.get("root") || defaultRoot);
const host = argumentsByName.get("host") || "127.0.0.1";
const port = Number(argumentsByName.get("port") || 4174);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("Preview port must be 1024-65535");
if (!new Set(["127.0.0.1", "0.0.0.0"]).has(host)) throw new Error("Preview host must be 127.0.0.1 or 0.0.0.0");
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"]
]);

function reject(response, status, message) {
  response.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  response.end(`${message}\n`);
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    reject(response, 405, "Method not allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, `http://${host}:${port}`).pathname);
  } catch {
    reject(response, 400, "Bad request");
    return;
  }

  if (pathname === "/") pathname = "/index.html";
  const segments = pathname.split("/").filter(Boolean);
  if (segments.some(segment => segment === ".." || segment.startsWith("."))) {
    reject(response, 404, "Not found");
    return;
  }

  const candidate = path.resolve(root, ...segments);
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) {
    reject(response, 404, "Not found");
    return;
  }

  try {
    const stat = await lstat(candidate);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error("not a regular file");
    response.writeHead(200, {
      "Content-Type": contentTypes.get(path.extname(candidate).toLowerCase()) || "application/octet-stream",
      "Content-Length": stat.size,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(candidate).pipe(response);
  } catch {
    reject(response, 404, "Not found");
  }
});

server.listen(port, host, () => {
  console.log(`Little Things Studio preview: http://${host}:${port}/index.html`);
});
