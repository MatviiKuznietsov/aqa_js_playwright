import {expect, test} from "@playwright/test";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";
import {Users} from "../../src/data/Users.js";
import {DEFAULT_CAR_WITH_CHANGES} from "../../src/fixtures/carApiFixtures.js";
import {HttpStatus} from "../../src/data/httpStatus.js";
import {CAR_NOT_FOUND} from "../../src/fixtures/carApiErrorMsgFxitures.js";

let carCtrl;
let authCtrl

let carId;
const INVALID_CAR_ID = "6666"

test.describe("Edit Cars tests", () => {
    test.beforeEach("Preparation log in", async ({request}) => {
        carCtrl = new CarsControllers(request);
        authCtrl = new AuthControllers(request);
        const bodySignIn = await (await authCtrl.sigInUser(getUser(Users.userTom.email, Users.userTom.password))).json()
        expect(bodySignIn.status).toBe('ok')
    })

    test.afterEach("Delete car", async () => {
        await carCtrl.deleteCar(carId);
    })

    test("Edit not exist car", async () => {
        const responseEditCar = await carCtrl.editExistingCar(INVALID_CAR_ID, DEFAULT_CAR_WITH_CHANGES)
        const bodyEditCar = await responseEditCar.json()
        expect(responseEditCar.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
        expect(bodyEditCar).toEqual(CAR_NOT_FOUND)
    })
})