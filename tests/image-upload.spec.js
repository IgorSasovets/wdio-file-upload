'use strict';

const assert = require('assert');
const faker = require('faker');
const ImageUploadPage = require('../pages/ImageUploadPage');

describe('Image upload issue', () => {
    before(() => ImageUploadPage.navigateToUpload());

    describe('Upload image for processing', () => {
        it('Should upload image for processing', async() => {
            await ImageUploadPage.uploadImageForProcessing('../images/yamaha.jpg');
            const isImageUploaded = await ImageUploadPage.closeImageEditorButton
                .then(el => el.isDisplayed());
            assert.equal(isImageUploaded, true);
        });
        after(() => ImageUploadPage.closeImageEditor());
    });

    describe('Negative login', () => {
        it('Should not log into the application', async() => {
            await ImageUploadPage.navigateToLogin();
            await ImageUploadPage.fillLoginForm(faker.internet.email(), faker.internet.password());
            await ImageUploadPage.submitUserCredentials();
            assert.equal(await ImageUploadPage.getErrorMessageText(), 'Incorrect email.');
        });
    });

    after(() => browser.deleteCookies());
});
