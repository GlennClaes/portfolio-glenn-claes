import { createServer } from 'node:http';
import { createReadStream, existsSync, realpathSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootArg = process.argv[2] ?? 'out';
const root = resolve(process.cwd(), rootArg);
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? '127.0.0.1';
const knownBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/portfolio-glenn-claes';

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

function toCanonicalPath(filePath) {
  try {
    return realpathSync(filePath);
  } catch {
    return null;
  }
}

function toFilePath(urlPath) {
  const normalized = urlPath === '/' ? '/index.html' : urlPath;

  if (!normalized.startsWith('/')) {
    return resolve(root, 'index.html');
  }

  if (normalized.includes('..') || normalized.includes('\0')) {
    return resolve(root, 'index.html');
  }

  const safePath = normalized.replace(/[^a-zA-Z0-9._/-]/g, '_');

  return resolve(root, `.${safePath}`);
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

function sanitizeUrlPath(urlPath) {
  const rawPath = urlPath.split('?')[0] ?? '/';
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(rawPath);
  } catch {
    return null;
  }

  if (!decodedPath.startsWith('/')) return null;

  const normalizedPath = normalize(decodedPath.replace(/\\/g, '/'));
  const segments = normalizedPath.split('/');

  if (segments.includes('..')) return null;

  return normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
}

function resolveAsset(urlPath) {
  const cleanPath = sanitizeUrlPath(urlPath);
  if (!cleanPath) return null;

  for (const pathCandidate of candidatePaths(cleanPath)) {
    let target = toFilePath(pathCandidate);

    if (!isInsideRoot(target)) {
      continue;
    }

    if (existsSync(target) && statSync(target).isDirectory()) {
      target = join(target, 'index.html');
    }

    const canonicalTarget = toCanonicalPath(target);
    if (canonicalTarget && isInsideRoot(canonicalTarget)) {
      return canonicalTarget;
    }
  }

  const fallback = toCanonicalPath(resolve(root, 'index.html'));
  return fallback && isInsideRoot(fallback) ? fallback : null;
}

if (!existsSync(root)) {
  const scriptName = fileURLToPath(import.meta.url);
  console.error(`Static output folder not found: ${root}`);
  console.error(`Run "npm run build" before "node ${scriptName} ${rootArg}".`);
  process.exit(1);
}

const canonicalRoot = realpathSync(root);

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
