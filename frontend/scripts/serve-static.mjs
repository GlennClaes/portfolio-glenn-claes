import { createServer } from 'node:http';
import { createReadStream, existsSync, realpathSync, statSync } from 'node:fs';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootArg = process.argv[2] ?? 'out';
const root = resolve(process.cwd(), rootArg);
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? '127.0.0.1';
const knownBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/portfolio-glenn-claes';
let canonicalRoot;

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.woff2', 'font/woff2'],
]);

function isInsideRoot(filePath) {
  return filePath === canonicalRoot || filePath.startsWith(`${canonicalRoot}${sep}`);
}

function toFilePath(urlPath) {
  const normalized = urlPath === '/' ? '/index.html' : urlPath;
  return resolve(root, `.${normalized}`);
}

function candidatePaths(cleanPath) {
  const paths = [cleanPath];

  if (knownBasePath && cleanPath.startsWith(`${knownBasePath}/`)) {
    paths.push(cleanPath.slice(knownBasePath.length) || '/');
  }

  if (knownBasePath && cleanPath === knownBasePath) {
    paths.push('/');
  }

  return paths;
}

function resolveAsset(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0] ?? '/');

  for (const pathCandidate of candidatePaths(cleanPath)) {
    let target = toFilePath(pathCandidate);

    if (!existsSync(target)) {
      continue;
    }

    target = realpathSync(target);
    if (!isInsideRoot(target)) {
      continue;
    }

    if (statSync(target).isDirectory()) {
      const indexTarget = join(target, 'index.html');
      if (!existsSync(indexTarget)) {
        continue;
      }
      target = realpathSync(indexTarget);
      if (!isInsideRoot(target)) {
        continue;
      }
    }

    if (existsSync(target)) {
      return target;
    }
  }

  const fallback = resolve(root, 'index.html');
  if (!existsSync(fallback)) {
    return null;
  }
  const canonicalFallback = realpathSync(fallback);
  return isInsideRoot(canonicalFallback) ? canonicalFallback : null;
}

if (!existsSync(root)) {
  const scriptName = fileURLToPath(import.meta.url);
  console.error(`Static output folder not found: ${root}`);
  console.error(`Run "npm run build" before "node ${scriptName} ${rootArg}".`);
  process.exit(1);
}

canonicalRoot = realpathSync(root);

createServer((request, response) => {
  const asset = resolveAsset(request.url ?? '/');

  if (!asset) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'content-type': contentTypes.get(extname(asset)) ?? 'application/octet-stream',
  });
  createReadStream(asset).pipe(response);
}).listen(port, host, () => {
  console.log(`Static preview running at http://${host}:${port}`);
});
