/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  i18n: {
    locales: ["nl-NL"],
    defaultLocale: "nl-NL",
  },
  async redirects() {
    return [
      {
        source: '/membership',
        destination: '/flexwerken',
        permanent: true,
      },
      {
        source: '/community',
        destination: '/over-ons',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
