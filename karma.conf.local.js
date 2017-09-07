module.exports = function(config) {
    config.set({
        plugins: [
            'karma-fixture',
            'karma-jasmine',
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-spec-reporter',
            'karma-coverage'
        ],
        basePath: '',
        frameworks: [
            'jasmine',
            'fixture'
        ],
        files: [
            'bower_components/tui-code-snippet/code-snippet.js',
            'test/*.spec.js'
        ],
        preprocessors: {
            'src/*.js': ['webpack', 'sourcemap'],
            'test/*.spec.js': ['webpack', 'sourcemap']
        },
        webpack: {
            devtool: 'inline-source-map',
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
        },
        webpackMiddleware: {
          noInfo: true
        },
        reporters: [
            'spec',
            'junit',
            'coverage'
        ],
        specReporter: {
            suppressSkipped: true,
            suppressPassed: true
        },
        coverageReporter: {
            type: 'cobertura'
        },
        junitReporter: {
            outputDir: 'junit'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity
    })
}
