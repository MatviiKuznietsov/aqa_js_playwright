import {expect, test} from "@playwright/test";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";
import {Users} from "../../src/data/Users.js";
import {DEFAULT_CAR_INVALID} from "../../src/fixtures/carApiFixtures.js";
import {HttpStatus} from "../../src/data/httpStatus.js";
import {BAD_REQUEST_BRAND} from "../../src/fixtures/carApiErrorMsgFxitures.js";

let carCtrl;
let authCtrl
let carId;
test.describe("Create cars tests", () => {
    test.beforeEach("Preparation log in", async ({request}) => {
        carCtrl = new CarsControllers(request);
        authCtrl = new AuthControllers(request);
        const bodySignIn = await (await authCtrl.sigInUser(getUser(Users.userTom.email, Users.userTom.password))).json()
        expect(bodySignIn.status).toBe('ok')
    })

    test.afterEach("Delete car", async () => {
        await carCtrl.deleteCar(carId);
    })

    test("Create new car with invalid data test", async () => {
        const response = await carCtrl.createNewCar(DEFAULT_CAR_INVALID)
        const body = await response.json()
        expect(response.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
        expect(body).toEqual(BAD_REQUEST_BRAND)
    })

})