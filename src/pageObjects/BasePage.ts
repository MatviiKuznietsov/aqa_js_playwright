import {Page} from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly url: string

    constructor(page: Page, url: string) {
        this.page = page;
        this.url = url
    }

    async navigate() {
        await this.page.goto(this.url)
    }

}