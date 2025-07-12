/** @type {import('next').NextConfig} */
const nextConfig = {
   typescript: {
    // ⬇️ Bỏ qua mọi lỗi TS khi `next build`
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000'
        // pathname: '/photos/**'
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
}

export default nextConfig
