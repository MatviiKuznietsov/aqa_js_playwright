import {Locator, Page} from "@playwright/test";

export class GaragePage {
    readonly page: Page;

    readonly settingNavLink: Locator;
    readonly btnRemoveMyAccount: Locator;
    readonly btnRemove: Locator;

    public constructor(page: Page) {
        this.page = page;

        this.settingNavLink = page.locator(' a[routerlink=\'settings\']')
        this.btnRemoveMyAccount = page.locator('.btn-danger-bg')
        this.btnRemove = page.locator('.btn-danger')
    }

    async removeUser() {
        await this.settingNavLink.click()
        await this.btnRemoveMyAccount.click()
        await this.btnRemove.click()
    }
}