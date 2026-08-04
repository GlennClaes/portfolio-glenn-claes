import { createServer } from 'node:http';
import { createReadStream, existsSync, realpathSync, statSync } from 'node:fs';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootArg = process.argv[2] ?? 'out';
const root = resolve(process.cwd(), rootArg);
const realRoot = existsSync(root) ? realpathSync(root) : root;
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
  return filePath === realRoot || filePath.startsWith(`${realRoot}${sep}`);
}

function toFilePath(urlPath) {
  const normalized = urlPath === '/' ? '/index.html' : urlPath;
  return resolve(root, `.${normalized}`);
}

function sanitizeUrlPath(urlPath) {
  const normalizedSeparators = urlPath.replaceAll('\\', '/');
  const withLeadingSlash = normalizedSeparators.startsWith('/') ? normalizedSeparators : `/${normalizedSeparators}`;
  const segments = withLeadingSlash.split('/').filter(Boolean);

  if (segments.some((segment) => segment === '.' || segment === '..')) {
    return null;
  }

  return segments.length === 0 ? '/' : `/${segments.join('/')}`;
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

function normalizeUrlPath(urlPath) {
  try {
    const parsed = new URL(urlPath, 'http://localhost');
    const pathname = parsed.pathname || '/';

    if (!pathname.startsWith('/')) {
      return null;
    }

    if (pathname.includes('\0')) {
      return null;
    }

    return pathname;
  } catch {
    return null;
  }
}

function resolveAsset(urlPath) {
  const cleanPath = normalizeUrlPath(urlPath);
  if (!cleanPath) {
    return null;
  }

  const safePath = sanitizeUrlPath(cleanPath);
  if (!safePath) {
    return null;
  }

  for (const pathCandidate of candidatePaths(safePath)) {
    let target = toFilePath(pathCandidate);

    if (!existsSync(target)) {
      continue;
    }

    const canonicalTarget = realpathSync(target);
    if (!isInsideRoot(canonicalTarget)) {
      continue;
    }

    if (statSync(canonicalTarget).isDirectory()) {
      target = join(canonicalTarget, 'index.html');
      if (!existsSync(target)) {
        continue;
      }
    } else {
      target = canonicalTarget;
    }

    const finalTarget = realpathSync(target);
    if (isInsideRoot(finalTarget) && existsSync(finalTarget)) {
      return finalTarget;
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
