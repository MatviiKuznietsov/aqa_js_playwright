import {BasePage} from "../BasePage";
import {Locator, Page} from "@playwright/test";
import {SignUpPopUp} from "./components/SignUpPopUp";
import {SigInPopUp} from "./components/SigInPopUp";

export class WelcomePage extends BasePage {
    readonly btnSignUp: Locator;
    readonly signUpPopUp: SignUpPopUp
    readonly sigInPopUp: SigInPopUp

    readonly btnSignIn: Locator;

    constructor(page: Page) {
        super(page, "/");
        this.btnSignUp = page.locator('button.hero-descriptor_btn')
        this.btnSignIn = page.locator('button.header_signin')
        this.signUpPopUp = new SignUpPopUp(page)
        this.sigInPopUp = new SigInPopUp(page)
    }

    async openSignUpPopUp() {
        await this.btnSignUp.click()
        return new SignUpPopUp(this.page)
    }
    async openSignInPopUp() {
        await this.btnSignIn.click()
        return new SigInPopUp(this.page)
    }
}