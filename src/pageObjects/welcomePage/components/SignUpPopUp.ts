import {Locator, Page} from "@playwright/test";
import {User} from "../../../entitys/User";
import {BaseComponent} from "../../../components/BaseComponent";

export class SignUpPopUp extends BaseComponent {
    readonly page: Page;

    readonly btnRegister: Locator;
    readonly btnRemoveMyAccount: Locator;

    readonly inputName: Locator;
    readonly inputLastName: Locator;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly inputReEnterPassword: Locator;

    readonly invalidMsg: Locator;
    readonly signUpForm: Locator;


    public constructor(page: Page) {
        super(page, page.locator('app-signup-modal'));
        this.page = page;

        this.btnRegister = this.container.locator('div.modal-footer button')
        this.btnRemoveMyAccount = this.container.locator('.close')

        this.inputName = this.container.locator('#signupName')
        this.inputLastName = this.container.locator('#signupLastName')
        this.inputEmail = this.container.locator('#signupEmail')
        this.inputPassword = this.container.locator('#signupPassword')
        this.inputReEnterPassword = this.container.locator('#signupRepeatPassword')

        this.invalidMsg = this.container.locator('div.invalid-feedback p')
        this.signUpForm = this.container.locator('.modal-content')
    }

    async signUpUser(user: User) {
        const time: number = 10
        const prefix: string = 'AQA'

        await this.inputName.pressSequentially(user.name, {delay: time})
        await this.inputLastName.pressSequentially(user.lastName, {delay: time})
        await this.inputEmail.pressSequentially(prefix + user.email, {delay: time})
        await this.inputPassword.pressSequentially(user.password, {delay: time})
        await this.inputReEnterPassword.pressSequentially(user.password, {delay: time})
        await this.btnRegister.click()
    }

    async fillFieldName(data: string) {
        await this.inputName.fill(data)
        await this.inputName.blur()
    }

    async fillFieldLastName(data: string) {
        await this.inputLastName.fill(data)
        await this.inputLastName.blur()
    }

    async fillFieldEmail(data: string) {
        await this.inputEmail.fill(data)
        await this.inputEmail.blur()
    }

    async fillFieldPass(data: string) {
        await this.inputPassword.fill(data)
        await this.inputPassword.blur()
    }

    async fillFieldRepeatPass(data: string) {
        await this.inputReEnterPassword.fill(data)
        await this.inputReEnterPassword.blur()
    }

    async fillFieldPassAndRepeatPass(dataPass: string, dataRepeatPass: string) {
        await this.inputPassword.fill(dataPass)
        await this.inputPassword.blur()
        await this.inputReEnterPassword.fill(dataRepeatPass)
        await this.inputReEnterPassword.blur()
    }
}