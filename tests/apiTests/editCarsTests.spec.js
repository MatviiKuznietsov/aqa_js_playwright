import {expect, test} from "@playwright/test";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";
import {Users} from "../../src/data/Users.js";
import {
    DEFAULT_CAR,
    DEFAULT_CAR_WITH_CHANGES,
    DEFAULT_CAR_WITH_CHANGES_RESPONSE,
    expectedCarBody
} from "../../src/fixtures/carApiFixtures.js";
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
        const bodySignIn = await (await authCtrl.SigInUser(getUser(Users.userTom.email, Users.userTom.password))).json()
        expect(bodySignIn.status).toBe('ok')
    })
    test.afterEach("Delete car", async () => {
        await carCtrl.deleteCar(carId);
    })
    test.describe('Edit car tests', () => {
        test("Edit car test", async () => {
            const responseCreateCar = await carCtrl.createNewCar(DEFAULT_CAR)
            expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_CREATED)
            carId = (await responseCreateCar.json()).data.id
            const responseEditCar = await carCtrl.editExistingCar((await responseCreateCar.json()).data.id, DEFAULT_CAR_WITH_CHANGES)
            const carEditBody = await expectedCarBody(responseEditCar)
            expect(responseEditCar.status()).toBe(HttpStatus.HTTP_OK)
            expect(carEditBody).toEqual(DEFAULT_CAR_WITH_CHANGES_RESPONSE)
        })
        test("Edit not exist car", async () => {
            const responseEditCar = await carCtrl.editExistingCar(INVALID_CAR_ID, DEFAULT_CAR_WITH_CHANGES)
            expect(responseEditCar.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
            expect(await responseEditCar.json()).toEqual(CAR_NOT_FOUND)
        })
    })
})