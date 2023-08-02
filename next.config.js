/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/edu4u',
        permanent: false,
      },{
        source: '/intro/wawa/:path*',
        destination: '/partners/wawa',
        permanent: false,
      },{
        source: '/intro/goodo',
        destination: '/partners/goodo',
        permanent: false,
      },{
        source: '/post/about.md',
        destination: '/edu4u',
        permanent: false,
      },{
        source: '/post/10_howcoding',
        destination: '/post/detail/10',
        permanent: false,
      },{
        source: '/post/11_solute_4.md',
        destination: '/post/detail/11',
        permanent: false,
      },{
        source: '/post/7_goodo.md',
        destination: '/post/detail/7',
        permanent: false,
      },{
        source: '/post/13_wawa_230106',
        destination: '/post/detail/13',
        permanent: false,
      },{
        source: '/post/11_solute_4',
        destination: '/post/detail/11',
        permanent: false,
      },{
        source: '/post/4_solute',
        destination: '/post/detail/4',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
