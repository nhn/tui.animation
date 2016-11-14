const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production';
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

if (isProduction) {
    config.output.filename = `${pkg.name}.min.js`;

    const uglifyJS = new webpack.optimize.UglifyJsPlugin({
        compress: {
            drop_console: true,
            warnings: false
        }
    });

    config.plugins.push(uglifyJS);
}

module.exports = config;
