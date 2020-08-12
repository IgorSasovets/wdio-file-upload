'use strict';

global.mocha = require('mocha');

exports.config = {
    hostname: 'test.com',
    port: 1678,
    path: '/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 99999,
    },
    capabilities: [
        {
            browserName: process.env.BROWSER || 'chrome',
        },
    ],
    baseUrl: 'https://photoscissors.com/',
    logLevel: 'debug',
    specs: ['tests/*spec.js'],
    services: [
        process.env.BROWSER && process.env.BROWSER === 'firefox' ? 'geckodriver' : 'chromedriver',
    ],
    before(capabilities, specs) {
        console.log(capabilities, specs);
        browser.maximizeWindow();
    },
};
