import {expect, test} from "@playwright/test";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";
import {Users} from "../../src/data/Users.js";
import {Brands} from "../../src/data/brands.js";
import {MODELS} from "../../src/data/models.js";
import {DEFAULT_CAR_INVALID, getExpectedCreateBody, getRequestBody} from "../../src/fixtures/carApiFixtures.js";
import {HttpStatus} from "../../src/data/httpStatus.js";
import {BAD_REQUEST_BRAND} from "../../src/fixtures/carApiErrorMsgFxitures.js";

let carCtrl;
let authCtrl
let carId;
test.describe("Create cars tests", () => {
    test.beforeEach("Preparation log in", async ({request}) => {
        carCtrl = new CarsControllers(request);
        authCtrl = new AuthControllers(request);
        const bodySignIn = await (await authCtrl.SigInUser(getUser(Users.userTom.email, Users.userTom.password))).json()
        expect(bodySignIn.status).toBe('ok')
    })
    test.afterEach("Delete car", async () => {
        await carCtrl.deleteCar(carId);
    })
    test.describe('Create car tests', () => {
        for (const brand of Object.values(Brands)) {
            for (const model of Object.values(MODELS[brand.id])) {
                test(`Create car with brand "${brand.title}" and model ${model.title} compact`, async ({request}) => {
                    const carCtrl = new CarsControllers(request)
                    const requestBodyCreateCar = getRequestBody(brand.id, model.id, Math.floor(Math.random() * 100))
                    const responseCreateCar = await carCtrl.createNewCar(requestBodyCreateCar)
                    const bodyCreateCar = await responseCreateCar.json()
                    const expectedCreateCarBody = getExpectedCreateBody(brand, model, requestBodyCreateCar.mileage)

                    expect(bodyCreateCar.status).toBe('ok')
                    expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_CREATED)
                    expect(bodyCreateCar.data).toEqual(expectedCreateCarBody)
                    carId = bodyCreateCar.data.id
                })
            }
        }
        test("Create new car with invalid data test", async () => {
            const response = await carCtrl.createNewCar(DEFAULT_CAR_INVALID)
            expect(response.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
            expect(await response.json()).toEqual(BAD_REQUEST_BRAND)
        })
    })
})