const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = (options, webpack) => {
    const lazyImports = [
        '@nestjs/microservices/microservices-module',
        '@nestjs/websockets/socket-module',
    ];

    return {
        ...options,
        entry: './src/serverless.ts',
        externals: [],
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            plugins: [new TsconfigPathsPlugin({})],
        },
        plugins: [
            ...options.plugins,
            new webpack.IgnorePlugin({
                checkResource(resource) {
                    if (lazyImports.includes(resource)) {
                        try {
                            require.resolve(resource);
                        } catch (err) {
                            return true;
                        }
                    }
                    return false;
                },
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    use: ['source-map-loader'],
                },
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: path.resolve(__dirname, 'src/main.ts'),
                    // exclude: /node_modules/,
                },
            ],
        },
        stats: { errorDetails: true },
    };
};
