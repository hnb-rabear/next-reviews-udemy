/** @type {import('next').NextConfig} */
module.exports = {
    // output: 'export',
    images: {
        // loader: 'custom',
        // loaderFilename: 'loader.js',
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**'
            }
        ]
    }
};