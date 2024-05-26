const path = require('path');
const { IgnorePlugin } = require('webpack');
const {
    swcDefaultsFactory,
} = require('@nestjs/cli/lib/compiler/defaults/swc-defaults');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const CircularDependencyPlugin = require('circular-dependency-plugin');

/** @type { import('webpack').Configuration } */
module.exports = {
    entry: './apps/api/src/serverless',
    output: {
        filename: 'serverless.js',
        path: path.resolve(__dirname, 'dist/'),
        libraryTarget: 'commonjs2',
    },
    externals: [],
    module: {
        rules: [
            {
                // exclude: /node_modules/,
                test: /\.ts$/,
                use: {
                    loader: 'swc-loader',
                    options: swcDefaultsFactory().swcOptions,
                },
            },
            { test: /\.js\.map$/, loader: 'ignore-loader', enforce: 'pre' },
            {
                test: /\.js$/,
            },
        ],
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    plugins: [
        new IgnorePlugin({
            checkResource(resource) {
                const lazyImports = [
                    '@fastify/static',
                    '@fastify/view',
                    '@nestjs/microservices',
                    '@nestjs/microservices/microservices-module',
                    '@nestjs/platform-express',
                    '@nestjs/websockets/socket-module',
                    'amqp-connection-manager',
                    'amqplib',
                    'cache-manager',
                    'cache-manager/package.json',
                    'class-transformer/storage',
                    'hbs',
                    'ioredis',
                    'kafkajs',
                    'mqtt',
                    'nats',
                ];
                if (!lazyImports.includes(resource)) {
                    return false;
                }
                try {
                    require.resolve(resource, { paths: [process.cwd()] });
                } catch (err) {
                    return true;
                }
                return false;
            },
        }),
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            include: /\.ts/,
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        }),
    ],
    // resolve: {
    //     extensions: ['.js', '.json', '.ts'],
    //     mainFields: ['main'],
    //     plugins: [new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })],
    //     symlinks: true, //default value
    // },
    target: 'node',
    stats: {
        excludeAssets: /\.map$/,
    },
    devtool: false,
};
