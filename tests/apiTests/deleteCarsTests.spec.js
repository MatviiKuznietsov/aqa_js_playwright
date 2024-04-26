import {expect, test} from "@playwright/test";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";
import {Users} from "../../src/data/Users.js";
import {DEFAULT_CAR, EMPTY_LIST_CARS} from "../../src/fixtures/carApiFixtures.js";
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
        const bodySignIn = await (await authCtrl.SigInUser(getUser(Users.userTom.email, Users.userTom.password))).json()
        expect(bodySignIn.status).toBe('ok')
    })
    test.afterEach("Delete car", async () => {
        await carCtrl.deleteCar(carId);
    })
    test.describe('Delete car tests', () => {
        test("Delete car by id test", async () => {
            const responseCreateCar = await carCtrl.createNewCar(DEFAULT_CAR)
            expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_CREATED)
            const carResponse = (await responseCreateCar.json()).data
            const responseDel = await carCtrl.deleteCar(carResponse.id)
            expect(responseDel.status()).toBe(HttpStatus.HTTP_OK)
            expect(await responseDel.json()).toMatchObject({
                "status": "ok",
                "data": {
                    "carId": carResponse.id
                }
            })
            const response = await carCtrl.getCurrentUserCar()
            await expect(response).toBeOK()
            expect(await response.json()).toEqual(EMPTY_LIST_CARS)
        })
        test("Delete not exist car", async () => {
            const responseDel = await carCtrl.deleteCar(INVALID_CAR_ID)
            expect(responseDel.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
            expect(await responseDel.json()).toEqual(CAR_NOT_FOUND)
        })
    })
})