import {expect, test} from "../../src/fixtures/GarageFixtures.js"
import {Cars} from "../../src/data/Cars.ts";

test.describe('Add car test', () => {
    test('Add BMW X5', async ({userGaragePage}) => {
        await (await userGaragePage.openAddCarPopUp()).addNewCar(Cars.carBmwX5)
        await expect(userGaragePage.labelCar).toHaveText(`${Cars.carBmwX5.brand} ${Cars.carBmwX5.model}`)
    })
})
