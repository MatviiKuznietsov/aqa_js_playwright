import {expect, test} from "@playwright/test";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";
import {Users} from "../../src/data/Users.js";
import {HttpStatus} from "../../src/data/httpStatus.js";
import {NOT_FOUND_BRANDS_WITH_ID} from "../../src/fixtures/carApiErrorMsgFxitures.js";

let carCtrl;
let authCtrl
let carId;

const INVALID_BRAND_ID = 5555
const INVALID_MODEL_ID = 6666
test.describe("Create cars tests", () => {
    test.beforeEach("Preparation log in", async ({request}) => {
        carCtrl = new CarsControllers(request);
        authCtrl = new AuthControllers(request);
        const bodySignIn = await (await authCtrl.sigInUser(getUser(Users.userBen.email, Users.userBen.password))).json()
        expect(bodySignIn.status).toBe('ok')
    })

    test.afterEach("Delete car", async () => {
        await carCtrl.deleteCar(carId);
    })

    test("Get car brand by invalid id test", async () => {
        const response = await carCtrl.getCarBrandsById(INVALID_BRAND_ID)
        const body = await response.json()
        expect(response.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
        expect(body).toEqual(NOT_FOUND_BRANDS_WITH_ID)
    })
    test("Get car model by invalid id test", async () => {
        const response = await carCtrl.getCarBrandsById(INVALID_MODEL_ID)
        const body = await response.json()
        expect(response.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
        expect(body).toEqual(NOT_FOUND_BRANDS_WITH_ID)
    })
})



