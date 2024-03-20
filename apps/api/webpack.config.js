module.exports = (options, webpack) => {
    const lazyImports = [
        '@nestjs/microservices/microservices-module',
        '@nestjs/websockets/socket-module',
    ];

    return {
        ...options,
        externals: [],
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
                    exclude: /node_modules/,
                },
            ],
        },
    };
};
