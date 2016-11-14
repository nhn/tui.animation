var webdriverConfig = {
    hostname: 'fe.nhnent.com',
    port: 4444,
    remoteHost: true
};

module.exports = function(config) {
    config.set({
        plugins: [
            'karma-fixture',
            'karma-jasmine',
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-webdriver-launcher',
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
        browsers: [
            'IE8',
            'IE9',
            'IE10',
            'IE11',
            'Edge',
            'Chrome-WebDriver',
            'Firefox-WebDriver'
        ],
        customLaunchers: {
            'IE8': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 8
            },
            'IE9': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 9
            },
            'IE10': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 10
            },
            'IE11': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 11
            },
            'Edge': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'MicrosoftEdge'
            },
            'Chrome-WebDriver': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'chrome'
            },
            'Firefox-WebDriver': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'firefox'
            }
        },
        singleRun: true,
        concurrency: Infinity
    })
}
