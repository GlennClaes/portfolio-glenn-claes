import { spawn } from 'node:child_process';

const env = {};
const seenEnvKeys = new Set();

for (const [key, value] of Object.entries(process.env)) {
  const normalizedKey = process.platform === 'win32' ? key.toLowerCase() : key;
  if (seenEnvKeys.has(normalizedKey)) continue;

  seenEnvKeys.add(normalizedKey);
  env[key] = value;
}

Object.assign(env, {
  GITHUB_PAGES: 'true',
  NEXT_PUBLIC_BASE_PATH: '/portfolio-glenn-claes',
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://glennclaes.github.io/portfolio-glenn-claes',
});

const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'build'], {
  env,
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
