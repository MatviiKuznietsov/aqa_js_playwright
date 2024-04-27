import {expect, test} from "../../src/fixtures/garageFixtures.js"
import {USER_MOCK_TITLES} from "../../src/fixtures/userTitles.js";


test.describe("Garage Net tests", () => {
    test("Substitute name and last name user on Garage page", async ({userGaragePage, page}) => {
        await page.route('api/users/profile', async (route) => {
            return route.fulfill({
                status: 200,
                body: JSON.stringify(USER_MOCK_TITLES)
            })
        })
        await userGaragePage.profileNavLink.click()
        await expect(userGaragePage.profileNameLable).toHaveText(`${USER_MOCK_TITLES.data.name} ${USER_MOCK_TITLES.data.lastName}`)
    })
})