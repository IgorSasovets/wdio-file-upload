'use strict';

global.mocha = require('mocha');

exports.config = {
    port: 9515,
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
    suites: {
        typeTextBug: ['tests/type-text.spec.js'],
    },
    before(capabilities, specs) {
        console.log(capabilities, specs);
        browser.maximizeWindow();
    },
};
