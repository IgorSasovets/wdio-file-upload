

const path = require('path');

class BasePage {
    navigateTo(url) {
        return browser.url(url);
    }

    async waitForElement(wdioElement, { timeout = 5000, retries = 10 } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        let iteration = 0;
        do {
            console.log('Waiting for element to become visible');
            try {
                await browser.waitUntil(() => element.isDisplayed(), timeout);
                return;
            } catch (err) {
                iteration++;
                console.log(err);
            }
        } while (iteration < retries);
        throw Error(`Element is not visible after ${retries} retries`);
    }

    async waitUntilElementBecomeClickable(wdioElement, { timeout = 5000, retries = 10 } = {}) {
        const element = typeof wdioElement === 'object' ? await wdioElement : wdioElement;
        let iteration = 0;
        do {
            console.log('Waiting for element to become clickable');
            try {
                await browser.waitUntil(() => element.isClickable(), timeout);
                return;
            } catch (err) {
                iteration++;
                console.log(err);
            }
        } while (iteration < retries);
        throw Error(`Element is not clickable after ${retries} retries`);
    }

    async clickOnElement(element) {
        await this.waitForElement(element);
        return element.then(el => el.click());
    }

    async changeElementText(element, text) {
        await this.waitForElement(element);
        return element.then(el => el.setValue(text));
    }

    async uploadFile(fileName) {
        await browser.execute(() => {
            document.querySelector('input[type=\'file\']').style = 'display: block; visibility: visible;';
        });
        const fileInput = await $('input[type=\'file\']');
        await this.waitForElement(fileInput);
        const absolutePath = await browser.uploadFile(path.resolve(__dirname, fileName));
        await fileInput.addValue(absolutePath);
        await browser.pause(1000);
    }
}

module.exports = BasePage;
