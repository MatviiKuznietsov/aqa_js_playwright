import {expect, test} from "@playwright/test";
import {User} from "../src/entitys/User.js";
import {WelcomePage} from "../src/pageObjects/welcomePage/WelcomePage.js";
import {RegistrationFormValidationMessages} from "../src/data/RegistrationFormValidationMessages.ts";
import {GaragePage} from "../src/pageObjects/garagePage/GaragePage.js";

let welcomePage

const URL_MAIN_PAGE = 'https://qauto.forstudy.space/panel/garage'
const TITLE = 'Hillel Qauto'
const ERROR_COLOR = 'rgb(220, 53, 69)'
const CSS_PROPERTY_BORDER_COLOR = 'border-color'
const EMPTY_DATA = ''
const SPECIAL_SYMBOLS = '###'
const OVER_MAX_SYMBOLS = 'qwertqwertqwertqwert2'
const LESS_MAX_SYMBOLS = 'a'

const user = new User('Jou', 'Dou', 'JouDou@mailto.plus', 'Password1Q')

test.describe('Registration user', () => {
    test.beforeEach('Preparation', async ({page}) => {
        welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
    })
    test.afterEach('After test actions', async ({page}) => {
        const garagePage = new GaragePage(page)
        await garagePage.removeUser()
    })
    test('Check successful registration user', async ({page}) => {
        //  await regPage.signUpUser(user)
        await (await welcomePage.openSignUpPopUp()).signUpUser(user)
        await expect(page).toHaveURL(URL_MAIN_PAGE)
        await expect(page).toHaveTitle(TITLE)
    })
})
test.describe('Negative sign up tests', () => {
    test.beforeEach('Preparation', async ({page}) => {
        welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
    })
    test("Check validation on empty field name", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldName(EMPTY_DATA)
        await expect(welcomePage.signUpPopUp.invalidMsg.last()).toContainText(RegistrationFormValidationMessages.MSG_EMPTY_NAME)
        await expect(welcomePage.signUpPopUp.inputName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on invalid data in field name", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldName(SPECIAL_SYMBOLS)
        await expect(welcomePage.signUpPopUp.invalidMsg).toContainText(RegistrationFormValidationMessages.MSG_INVALID_NAME)
        await expect(welcomePage.signUpPopUp.inputName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on over 20 symbols in field name", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldName(OVER_MAX_SYMBOLS)
        await expect(welcomePage.signUpPopUp.invalidMsg.last()).toContainText(RegistrationFormValidationMessages.MSG_OVER_LIMIT_NAME)
        await expect(welcomePage.signUpPopUp.inputName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation less than 2 symbols in field name", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldName(LESS_MAX_SYMBOLS)
        await expect(welcomePage.signUpPopUp.invalidMsg.last()).toContainText(RegistrationFormValidationMessages.MSG_OVER_LIMIT_NAME)
        await expect(welcomePage.signUpPopUp.inputName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on empty field last name", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldLastName(EMPTY_DATA)
        await expect(welcomePage.signUpPopUp.invalidMsg.last()).toContainText(RegistrationFormValidationMessages.MSG_EMPTY_LAST_NAME)
        await expect(welcomePage.signUpPopUp.inputLastName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on invalid data in field last name", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldLastName(SPECIAL_SYMBOLS)
        await expect(welcomePage.signUpPopUp.invalidMsg).toContainText(RegistrationFormValidationMessages.MSG_INVALID_LAST_NAME)
        await expect(welcomePage.signUpPopUp.inputLastName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation  on over 20 symbols in field last name", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldLastName(OVER_MAX_SYMBOLS)
        await expect(welcomePage.signUpPopUp.invalidMsg.last()).toContainText(RegistrationFormValidationMessages.MSG_OVER_LIMIT_LAST_NAME)
        await expect(welcomePage.signUpPopUp.inputLastName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation less than 2 symbols in field last name", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldLastName(LESS_MAX_SYMBOLS)
        await expect(welcomePage.signUpPopUp.invalidMsg.last()).toContainText(RegistrationFormValidationMessages.MSG_OVER_LIMIT_LAST_NAME)
        await expect(welcomePage.signUpPopUp.inputLastName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on empty field email", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldEmail(EMPTY_DATA)
        await expect(welcomePage.signUpPopUp.invalidMsg).toContainText(RegistrationFormValidationMessages.MSG_EMPTY_EMAIL)
        await expect(welcomePage.signUpPopUp.inputEmail).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on invalid data in field email", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldEmail(SPECIAL_SYMBOLS)
        await expect(welcomePage.signUpPopUp.invalidMsg).toContainText(RegistrationFormValidationMessages.MSG_INVALID_EMAIL)
        await expect(welcomePage.signUpPopUp.inputEmail).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on empty field password", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldPass(EMPTY_DATA)
        await expect(welcomePage.signUpPopUp.invalidMsg).toContainText(RegistrationFormValidationMessages.MSG_EMPTY_PASS)
        await expect(welcomePage.signUpPopUp.inputPassword).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on invalid data in field password", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldPass(SPECIAL_SYMBOLS)
        await expect(welcomePage.signUpPopUp.invalidMsg).toContainText(RegistrationFormValidationMessages.MSG_INVALID_PASS)
        await expect(welcomePage.signUpPopUp.inputPassword).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on empty field repeat password", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldRepeatPass(EMPTY_DATA)
        await expect(welcomePage.signUpPopUp.invalidMsg).toContainText(RegistrationFormValidationMessages.MSG_EMPTY_REPASS)
        await expect(welcomePage.signUpPopUp.inputReEnterPassword).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation if password and rename password no match", async () => {
        await (await welcomePage.openSignUpPopUp()).fillFieldPassAndRepeatPass(user.password, user.password + '1')
        await expect(welcomePage.signUpPopUp.invalidMsg).toContainText(RegistrationFormValidationMessages.MSG_PASS_NOT_MATCH)
        await expect(welcomePage.signUpPopUp.inputReEnterPassword).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check cancel sign up", async () => {
        await (await welcomePage.openSignUpPopUp()).btnRemoveMyAccount.click()
        await expect(welcomePage.signUpPopUp.signUpForm).toBeHidden()
    })
    test("Check not active registration button", async () => {
        await welcomePage.openSignUpPopUp()
        await expect(welcomePage.signUpPopUp.btnRegister).toBeDisabled()
    })
})

