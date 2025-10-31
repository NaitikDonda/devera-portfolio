/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE_SERVICE_ACCOUNT_KEY: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
  },
  // Required for Firebase Admin in Serverless Functions
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
  },
  // Optional: Handle Firebase Admin in API routes
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      dns: false,
      tls: false,
    };
    return config;
  },
}

module.exports = nextConfig
