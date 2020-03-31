'use strict';

const BasePage = require('./basePage.js');

class ImageUploadPage extends BasePage {
    constructor() {
        super();
    }

    get uploadImageButton() { return $('.dz-message .btn-primary'); }
    get closeImageEditorButton() { return $('.btn.btn-danger'); }
    get navigateToLoginButton() { return $('#loginBtn'); }
    get loginPageEmailField() { return $('input[type=\'email\']'); }
    get loginPagePasswordField() { return $('input[type=\'password\']'); }
    get loginPageSubmitFormButton() { return $('button[type=\'submit\']'); }
    get loginPageErrorMessage() { return $('.alert.alert-danger'); }

    async navigateToUpload() {
        await browser.url('https://photoscissors.com/');
        return this.waitForElement(this.uploadImageButton);
    }

    async uploadImageForProcessing(imagePath) {
        await this.uploadFile(imagePath);
        return this.waitForElement(this.closeImageEditorButton);
    }

    async closeImageEditor() {
        await this.waitUntilElementBecomeClickable(this.closeImageEditorButton);
        return this.clickOnElement(this.closeImageEditorButton);
    }

    async navigateToLogin() {
        await this.clickOnElement(this.navigateToLoginButton);
        return this.waitForElement(this.loginPageEmailField);
    }

    async fillLoginForm(userName, password) {
        await this.changeElementText(this.loginPageEmailField, userName);
        return this.changeElementText(this.loginPagePasswordField, password);
    }

    submitUserCredentials() {
        return this.clickOnElement(this.loginPageSubmitFormButton);
    }

    async getErrorMessageText() {
        await this.waitForElement(this.loginPageErrorMessage);
        return this.loginPageErrorMessage.then(el => el.getText());
    }
}

module.exports = new ImageUploadPage();
