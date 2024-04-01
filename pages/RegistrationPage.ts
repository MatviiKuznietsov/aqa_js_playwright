import {Locator, Page} from "@playwright/test";
import {User} from "../entitys/User";

export class RegistrationPage {
    readonly page: Page;

    readonly btnSignUp: Locator;
    readonly btnRegister: Locator;
    readonly btnRemoveMyAccount: Locator;

    readonly inputName: Locator;
    readonly inputLastName: Locator;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly inputReEnterPassword: Locator;

    readonly invalidNameMsg: Locator;
    readonly signUpForm: Locator;


    public constructor(page: Page) {
        this.page = page;

        this.btnSignUp = page.locator('button.hero-descriptor_btn')
        this.btnRegister = page.locator('div.modal-footer button')
        this.btnRemoveMyAccount = page.locator('.close')

        this.inputName = page.locator('#signupName')
        this.inputLastName = page.locator('#signupLastName')
        this.inputEmail = page.locator('#signupEmail')
        this.inputPassword = page.locator('#signupPassword')
        this.inputReEnterPassword = page.locator('#signupRepeatPassword')

        this.invalidNameMsg = page.locator('div.invalid-feedback p')
        this.signUpForm = page.locator('.modal-content')
    }

    async clickBtnSignUp() {
        await this.btnSignUp.click()
    }

    async signUpUser(user: User) {
        const time: number = 10
        const prefix: string = 'AQA'

        await this.btnSignUp.click();
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