module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma'),
      ],
      client: {
        clearContext: false,
      },
      browsers: ['CustomChromeHeadless'],
      customLaunchers: {
        CustomChromeHeadless: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox', '--disable-gpu', '--headless', '--remote-debugging-port=9222'],
        },
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      singleRun: true,
      restartOnFileChange: true,
    });
  };