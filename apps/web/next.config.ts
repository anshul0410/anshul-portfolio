import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        // The default Vercel address serves the same site; send it to the real domain
        // so search engines see one site, not two. Preview URLs are unaffected.
        source: "/:path*",
        has: [{ type: "host", value: "anshul-portfolio-web.vercel.app" }],
        destination: "https://anshulakotkar.is-a.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
