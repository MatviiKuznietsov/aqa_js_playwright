import {expect, Locator, Page} from "@playwright/test";

export class BaseComponent {
    readonly page: Page
    readonly container: Locator

    constructor(page: Page, container: Locator) {
        this.page = page;
        this.container = container;
    }

    async waitLoaded(){
        await expect(this.container).toBeVisible()
    }

}