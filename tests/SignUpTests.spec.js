import {expect, test} from "@playwright/test";
import {RegistrationPage} from "../pages/RegistrationPage.js";
import {MainPage} from "../pages/MainPage.js";
import {User} from "../entitys/User.js";

let regPage
let mainPage
const URL_MAIN_PAGE = 'https://qauto.forstudy.space/panel/garage'
const TITLE = 'Hillel Qauto'
const ERROR_COLOR = 'rgb(220, 53, 69)'

const MSG_EMPTY_NAME = 'Name required'
const MSG_INVALID_NAME = 'Name is invalid'
const MSG_OVER_LIMIT_NAME = 'Name has to be from 2 to 20 characters long'

const MSG_EMPTY_LAST_NAME = 'Last name required'
const MSG_INVALID_LAST_NAME = 'Last name is invalid'
const MSG_OVER_LIMIT_LAST_NAME = 'Last name has to be from 2 to 20 characters long'

const MSG_EMPTY_EMAIL = 'Email required'
const MSG_INVALID_EMAIL = 'Email is incorrect'

const MSG_EMPTY_PASS = 'Password required'
const MSG_INVALID_PASS = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'

const MSG_EMPTY_REPASS = 'Re-enter password required'
const MSG_PASS_NOT_MATCH = 'Passwords do not match'

const CSS_PROPERTY_BORDER_COLOR = 'border-color'

const EMPTY_DATA = ''
const SPECIAL_SYMBOLS = '###'
const OVER_MAX_SYMBOLS = 'qwertqwertqwertqwert2'
const LESS_MAX_SYMBOLS = 'a'

const user = new User('Jou', 'Dou', 'JouDou@mailto.plus', 'Password1Q')

test.describe('Registration user', () => {
    test.beforeEach('Preparation', async ({page}) => {
        await page.goto("")
        regPage = new RegistrationPage(page)
        mainPage = new MainPage(page)
    })
    test.afterEach('After test actions', async ({page}) => {
        page.url() === URL_MAIN_PAGE ? await mainPage.removeUser() : null;
    })
    test('Check successful registration user', async ({page}) => {
        await regPage.signUpUser(user)
        await expect(page).toHaveURL(URL_MAIN_PAGE)
        await expect(page).toHaveTitle(TITLE)

    })
})
test.describe('Negative sign up tests', () => {
    test.beforeEach('Preparation', async ({page}) => {
        await page.goto("")
        regPage = new RegistrationPage(page)
    })
    test("Check validation on empty field name", async () => {
        await regPage.fillFieldName(EMPTY_DATA)
        await expect(regPage.invalidNameMsg.last()).toContainText(MSG_EMPTY_NAME)
        await expect(regPage.inputName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on invalid data in field name", async () => {
        await regPage.fillFieldName(SPECIAL_SYMBOLS)
        await expect(regPage.invalidNameMsg).toContainText(MSG_INVALID_NAME)
        await expect(regPage.inputName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on over 20 symbols in field name", async () => {
        await regPage.fillFieldName(OVER_MAX_SYMBOLS)
        await expect(regPage.invalidNameMsg.last()).toContainText(MSG_OVER_LIMIT_NAME)
        await expect(regPage.inputName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation less than 2 symbols in field name", async () => {
        await regPage.fillFieldName(LESS_MAX_SYMBOLS)
        await expect(regPage.invalidNameMsg.last()).toContainText(MSG_OVER_LIMIT_NAME)
        await expect(regPage.inputName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on empty field last name", async () => {
        await regPage.fillFieldLastName(EMPTY_DATA)
        await expect(regPage.invalidNameMsg.last()).toContainText(MSG_EMPTY_LAST_NAME)
        await expect(regPage.inputLastName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on invalid data in field last name", async () => {
        await regPage.fillFieldLastName(SPECIAL_SYMBOLS)
        await expect(regPage.invalidNameMsg).toContainText(MSG_INVALID_LAST_NAME)
        await expect(regPage.inputLastName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation  on over 20 symbols in field last name", async () => {
        await regPage.fillFieldLastName(OVER_MAX_SYMBOLS)
        await expect(regPage.invalidNameMsg.last()).toContainText(MSG_OVER_LIMIT_LAST_NAME)
        await expect(regPage.inputLastName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation less than 2 symbols in field last name", async () => {
        await regPage.fillFieldLastName(LESS_MAX_SYMBOLS)
        await expect(regPage.invalidNameMsg.last()).toContainText(MSG_OVER_LIMIT_LAST_NAME)
        await expect(regPage.inputLastName).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on empty field email", async () => {
        await regPage.fillFieldEmail(EMPTY_DATA)
        await expect(regPage.invalidNameMsg).toContainText(MSG_EMPTY_EMAIL)
        await expect(regPage.inputEmail).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on invalid data in field email", async () => {
        await regPage.fillFieldEmail(SPECIAL_SYMBOLS)
        await expect(regPage.invalidNameMsg).toContainText(MSG_INVALID_EMAIL)
        await expect(regPage.inputEmail).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on empty field password", async () => {
        await regPage.fillFieldPass(EMPTY_DATA)
        await expect(regPage.invalidNameMsg).toContainText(MSG_EMPTY_PASS)
        await expect(regPage.inputPassword).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on invalid data in field password", async () => {
        await regPage.fillFieldPass(SPECIAL_SYMBOLS)
        await expect(regPage.invalidNameMsg).toContainText(MSG_INVALID_PASS)
        await expect(regPage.inputPassword).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation on empty field repeat password", async () => {
        await regPage.fillFieldRepeatPass(EMPTY_DATA)
        await expect(regPage.invalidNameMsg).toContainText(MSG_EMPTY_REPASS)
        await expect(regPage.inputReEnterPassword).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check validation if password and rename password no match", async () => {
        await regPage.fillFieldPassAndRepeatPass(user.password, user.password + '1')
        await expect(regPage.invalidNameMsg).toContainText(MSG_PASS_NOT_MATCH)
        await expect(regPage.inputReEnterPassword).toHaveCSS(CSS_PROPERTY_BORDER_COLOR, ERROR_COLOR)
    })
    test("Check cancel sign up", async () => {
        await regPage.clickBtnSignUp()
        await regPage.btnRemoveMyAccount.click()
        await expect(regPage.signUpForm).toBeHidden()
    })
    test("Check not active registration button", async () => {
        await regPage.clickBtnSignUp()
        await expect(regPage.btnRegister).toHaveAttribute('disabled')
    })
})

