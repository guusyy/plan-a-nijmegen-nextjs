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
}

module.exports = nextConfig
