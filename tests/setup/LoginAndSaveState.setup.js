import {test as setup} from "@playwright/test";
import {expect} from "../../src/fixtures/GarageFixtures.js"
import {WelcomePage} from "../../src/pageObjects/welcomePage/WelcomePage.js";
import {USER_TOM_STORAGE_STATE_PATH} from "../../src/constants.js";
import {Users} from "../../src/data/Users.js";

setup.describe('Setup', () => {
    setup("Login and Save as ADMIN", async ({page}) => {
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        await (await welcomePage.openSignInPopUp()).logInUser(Users.userTom)
        await expect(page).toHaveURL(/garage/)
        await page.context().storageState({
            path: USER_TOM_STORAGE_STATE_PATH
        })
    })
})