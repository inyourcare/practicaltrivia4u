/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/edu4u',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
