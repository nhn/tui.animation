const webpack = require('webpack');
const pkg = require('./package.json');

const config = {
    entry: './src/index.js',
    output: {
        path: `${__dirname}/dist`,
        filename: `${pkg.name}.js`,
        publicPath: '/'
    },
    module: {
        noParse: /bower_components\/.*\/*.js/,
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }]
    },
    externals: {
        'code-snippet': 'tui.util'
    },
    plugins: [
        new webpack.BannerPlugin(`TOAST UI Animation Library ${pkg.version}`)
    ]
};

module.exports = config;
