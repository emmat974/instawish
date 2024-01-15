/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'symfony-instawish.formaterz.fr',
            },
        ],
    },
}

module.exports = nextConfig
