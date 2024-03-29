import {Locator, Page} from "@playwright/test";

export class MainPage {
    readonly page: Page;

    readonly signSetting: Locator;
    readonly btnClose: Locator;
    readonly btnRemove: Locator;

    public constructor(page: Page) {
        this.page = page;

        this.signSetting = page.locator(' a[routerlink=\'settings\']')
        this.btnClose = page.locator('.btn-danger-bg')
        this.btnRemove = page.locator('.btn-danger')
    }

    async removeUser() {
        await this.signSetting.click()
        await this.btnClose.click()
        await this.btnRemove.click()
    }
}