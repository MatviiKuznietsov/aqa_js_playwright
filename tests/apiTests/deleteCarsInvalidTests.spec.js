import {expect, test} from "@playwright/test";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";
import {Users} from "../../src/data/Users.js";
import {HttpStatus} from "../../src/data/httpStatus.js";
import {CAR_NOT_FOUND} from "../../src/fixtures/carApiErrorMsgFxitures.js";

let carCtrl;
let authCtrl

let carId;
const INVALID_CAR_ID = "6666"

test.describe("Delete cars tests", () => {
    test.beforeEach("Preparation log in", async ({request}) => {
        carCtrl = new CarsControllers(request);
        authCtrl = new AuthControllers(request);
        const bodySignIn = await (await authCtrl.sigInUser(getUser(Users.userTom.email, Users.userTom.password))).json()
        expect(bodySignIn.status).toBe('ok')
    })

    test.afterEach("Delete car", async () => {
        await carCtrl.deleteCar(carId);
    })

    test("Delete not exist car", async () => {
        const responseDel = await carCtrl.deleteCar(INVALID_CAR_ID)
        const respDel = await responseDel.json()
        expect(responseDel.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
        expect(respDel).toEqual(CAR_NOT_FOUND)
    })

})