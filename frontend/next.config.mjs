/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const githubPagesBasePath = '/portfolio-glenn-claes';

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: true,
  basePath: isGitHubPages ? githubPagesBasePath : '',
  assetPrefix: isGitHubPages ? `${githubPagesBasePath}/` : undefined,
  output: isGitHubPages ? 'export' : undefined,
  images: {
    unoptimized: isGitHubPages,
  },
};

export default nextConfig;
