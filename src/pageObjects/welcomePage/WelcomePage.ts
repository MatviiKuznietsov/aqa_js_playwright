import {BasePage} from "../BasePage";
import {Locator, Page} from "@playwright/test";
import {SignUpPopUp} from "./components/SignUpPopUp";

export class WelcomePage extends BasePage {
    readonly btnSignUp: Locator;
    readonly signUpPopUp: SignUpPopUp

    constructor(page: Page) {
        super(page, "/");
        this.btnSignUp = page.locator('button.hero-descriptor_btn')
        this.signUpPopUp = new SignUpPopUp(page)
    }

    async openSignUpPopUp() {
        await this.btnSignUp.click()
        return new SignUpPopUp(this.page)
    }

}