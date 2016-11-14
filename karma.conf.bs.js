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
            'karma-browserstack-launcher'
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
        browserStack: {
            username: process.env.BROWSER_STACK_USERNAME,
            accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
            project: 'tui-component-animation'
        },
        webpackMiddleware: {
          noInfo: true
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: [
            'bs_ie8',
            'bs_ie9',
            'bs_ie10',
            'bs_ie11',
            'bs_edge',
            'bs_chrome_mac',
            'bs_firefox_mac',
            'bs_iphone7',
            'bs_iphone6s',
            'bs_galaxy_s5',
            'bs_galaxy_note3'
        ],
        customLaunchers: {
            bs_ie8: {
                base: 'BrowserStack',
                os: 'Windows',
                os_version: 'XP',
                browser_version: '8.0',
                browser: 'ie'
            },
            bs_ie9: {
                base: 'BrowserStack',
                os: 'Windows',
                os_version: '7',
                browser_version: '9.0',
                browser: 'ie'
            },
            bs_ie10: {
                base: 'BrowserStack',
                os: 'Windows',
                os_version: '7',
                browser_version: '10.0',
                browser: 'ie'
            },
            bs_ie11: {
                base: 'BrowserStack',
                os: 'Windows',
                os_version: '7',
                browser_version: '11.0',
                browser: 'ie'
            },
            bs_edge: {
                base: 'BrowserStack',
                os: 'Windows',
                os_version: '10',
                browser: 'edge',
                browser_version: '12.0'
            },
            bs_chrome_mac: {
                base: 'BrowserStack',
                os: 'OS X',
                os_version: 'sierra',
                browser: 'chrome',
                browser_version: 'latest'
            },
            bs_firefox_mac: {
                base: 'BrowserStack',
                os: 'OS X',
                os_version: 'sierra',
                browser: 'firefox',
                browser_version: 'latest'
            },
            bs_iphone7: {
                base: 'BrowserStack',
                device: 'iPhone 7',
                os: 'ios',
                os_version: '10.0'
            },
            bs_iphone6s: {
                base: 'BrowserStack',
                device: 'iPhone 6S',
                os: 'ios',
                os_version: '9.3'
            },
            bs_galaxy_s5: {
                base: 'BrowserStack',
                device: 'Samsung Galaxy S5',
                os: 'android',
                os_version: '4.4'
            },
            bs_galaxy_note3: {
                base: 'BrowserStack',
                device: 'Samsung Galaxy Note 3',
                os: 'android',
                os_version: '4.3'
            }
        },
        singleRun: true,
        concurrency: Infinity
    })
}
