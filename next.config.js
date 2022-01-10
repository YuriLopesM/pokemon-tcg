/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

module.exports = withLess({
    reactStrictMode: true,
    cssModules: true,
    images: {
        domains: ['images.pokemontcg.io'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                and: [/\.(js|ts)x?$/]
            },

            use: ['@svgr/webpack'],
        });

        return config;
    },
    lessLoaderOptions: {
        lessOptions: {
            javascriptEnabled: true,

        }
    },
})

