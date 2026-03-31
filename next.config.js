/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Default demo mode for Vercel + local dev; override with DEMO_MODE=false for real auth.
    DEMO_MODE: process.env.DEMO_MODE ?? "true",
    NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE ?? "true",
  },
  images: {
    domains: ["localhost", "res.cloudinary.com", "images.unsplash.com"],
  },
}

module.exports = nextConfig
