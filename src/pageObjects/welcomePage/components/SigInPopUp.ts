import {BaseComponent} from "../../../components/BaseComponent";
import {Locator, Page} from "@playwright/test";
import {User} from "../../../entitys/User";

export class SigInPopUp extends BaseComponent {
    readonly page: Page;

    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly btnLogIn: Locator;

    constructor(page: Page) {
        super(page, page.locator('app-signin-modal'));
        this.inputEmail = this.container.locator('#signinEmail')
        this.inputPassword = this.container.locator('#signinPassword')
        this.btnLogIn = this.container.locator('button.btn-primary')
    }

    async logInUser(user: User) {
        await this.inputEmail.fill(user.email);
        await this.inputPassword.fill(user.password);
        await this.btnLogIn.click()

    }
}