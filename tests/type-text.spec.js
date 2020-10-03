'use strict';

const assert = require('assert');
const faker = require('faker');
const ImageUploadPage = require('../pages/ImageUploadPage');

describe('Type text issue', () => {
    before(() => ImageUploadPage.navigateToUpload());

    describe('Negative login', () => {
        it('Should not log into the application', async() => {
            await ImageUploadPage.navigateToLogin();
            await ImageUploadPage.fillLoginForm('Delete', faker.internet.password());
            await ImageUploadPage.submitUserCredentials();
            assert.equal(await ImageUploadPage.getInputText(ImageUploadPage.loginPageEmailField),
                'Delete');
        });
    });

    after(() => browser.deleteCookies());
});
