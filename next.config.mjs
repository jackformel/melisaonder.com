/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Note: Next.js doesn't natively support HEIC images
  // Consider adding a package like 'heic-convert' for server-side conversion
  // or convert HEIC files to JPG/PNG/WebP before use
  // Add other Next.js configurations here if needed
  // For example, to handle images from external domains:
  // images: {
  //   domains: ['example.com'],
  // },
};

export default nextConfig; 