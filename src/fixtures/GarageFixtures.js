import {expect as baseExpect, test as base} from "@playwright/test";
import {WelcomePage} from "../pageObjects/welcomePage/WelcomePage.js";
import {GaragePage} from "../pageObjects/garagePage/GaragePage.js";
import {USER_TOM_STORAGE_STATE_PATH} from "../constants.js";

export const test = base.extend({
    welcomePage: async ({page}, use) => {
        const welcomePage = new WelcomePage(page)
        await use(welcomePage)
    },
    userGaragePage: async ({browser}, use) => {
        const ctx = await browser.newContext({
            storageState: USER_TOM_STORAGE_STATE_PATH
        })
        const page = await ctx.newPage()
        const garagePage = new GaragePage(page)
        await garagePage.navigate()
        await use(garagePage)
    }
})
export const expect = baseExpect


