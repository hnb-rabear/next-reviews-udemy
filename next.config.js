/** @type {import('next').NextConfig} */
module.exports = {
    // output: 'export'
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/uploads/**'
            }
        ]
    }
};