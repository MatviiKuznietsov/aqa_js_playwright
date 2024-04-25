import {expect, test} from "@playwright/test";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {HttpStatus} from "../../src/data/httpStatus.ts";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {Users} from "../../src/data/Users.js";
import {
    DEFAULT_CAR,
    DEFAULT_CAR_INVALID,
    DEFAULT_CAR_WITH_CHANGES,
    DEFAULT_CAR_WITH_CHANGES_RESPONSE,
    EMPTY_LIST_CARS,
    expectedCarBody,
    getExpectedCreateBody,
    getRequestBody,
} from "../../src/fixtures/carApiFixtures.js";
import {
    AUTH_ERROR,
    BAD_REQUEST_BRAND,
    CAR_NOT_FOUND,
    NOT_FOUND_BRANDS_WITH_ID
} from "../../src/fixtures/carApiErrorMsgFxitures.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";
import {BRAND_CAR} from "../../src/fixtures/brandCarFixtures.js";
import {MODEL_CAR} from "../../src/fixtures/modelCarFixtures.js";
import {Brands} from "../../src/data/brands.js";
import {MODELS} from "../../src/data/models.js";

let carCtrl;
let authCtrl

let CAR_ID;
const INVALID_BRAND_ID = 5555
const INVALID_MODEL_ID = 6666
const INVALID_CAR_ID = "6666"

test.describe("Cars tests", () => {
    test.beforeEach("Preparation log in", async ({request}) => {
        carCtrl = new CarsControllers(request);
        authCtrl = new AuthControllers(request);
        const bodySignIn = await (await authCtrl.SigInUser(getUser(Users.userTom.email, Users.userTom.password))).json()
        expect(bodySignIn.status).toBe('ok')
    })
    test.afterEach("Delete car", async () => {
        await carCtrl.deleteCar(CAR_ID);
    })
    test.describe('Get car brand tests', () => {
        test("Get car brands test", async () => {
            const response = await carCtrl.getCarBrands()
            await expect(response).toBeOK()
            expect(await response.json()).toEqual(BRAND_CAR)
        })
    })
    test.describe('Get car brand by id tests', () => {
        test("Get car brand by id test", async () => {
            const response = await carCtrl.getCarBrandsById(BRAND_CAR.data[0].id)
            await expect(response).toBeOK()
            expect(await response.json()).toMatchObject({
                "status": "ok",
                "data": {
                    "id": BRAND_CAR.data[0].id,
                    "title": "Audi",
                    "logoFilename": "audi.png"
                }
            });
        })
        test("Get car brand by invalid id test", async () => {
            const response = await carCtrl.getCarBrandsById(INVALID_BRAND_ID)
            expect(response.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
            expect(await response.json()).toEqual(NOT_FOUND_BRANDS_WITH_ID)
        })
    })
    test.describe('Get car models tests', () => {
        test("Get car models test", async () => {
            const response = await carCtrl.getModels()
            await expect(response).toBeOK()
            expect(await response.json()).toEqual(MODEL_CAR)
        })
    })
    test.describe('Get car model by id tests', () => {
        test("Get car model by id test", async () => {
            const response = await carCtrl.getModelsById(MODEL_CAR.data[0].id)
            await expect(response).toBeOK()
            expect(await response.json()).toMatchObject({
                "status": "ok",
                "data": {
                    "id": MODEL_CAR.data[0].id,
                    "carBrandId": MODEL_CAR.data[0].id,
                    "title": "TT"
                }
            })
        })
        test("Get car model by invalid id test", async () => {
            const response = await carCtrl.getCarBrandsById(INVALID_MODEL_ID)
            expect(response.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
            expect(await response.json()).toEqual(NOT_FOUND_BRANDS_WITH_ID)
        })
    })
    test.describe('Get current user cars tests', () => {
        test("Get current user cars test", async () => {
            const responseCreateCar = await carCtrl.createNewCar(DEFAULT_CAR)
            const carBody = await expectedCarBody(responseCreateCar)
            expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_CREATED)
            CAR_ID = (await responseCreateCar.json()).data.id
            const responseCurrenUserCars = await carCtrl.getCurrentUserCar()
            await expect(responseCurrenUserCars).toBeOK()
            expect(carBody).toEqual((await responseCurrenUserCars.json()).data[0])
        })
        test("Get logOut User cars", async () => {
            await authCtrl.LogOutUser();
            const responseCurrenUserCars = await carCtrl.getCurrentUserCar()
            expect(responseCurrenUserCars.status()).toBe(HttpStatus.HTTP_UNAUTHORIZED)
            expect(await responseCurrenUserCars.json()).toEqual(AUTH_ERROR)
        })
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
                    CAR_ID = bodyCreateCar.data.id
                })
            }
        }
        test("Create new car with invalid data test", async () => {
            const response = await carCtrl.createNewCar(DEFAULT_CAR_INVALID)
            expect(response.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
            expect(await response.json()).toEqual(BAD_REQUEST_BRAND)

        })
    })
    test.describe('Edit car tests', () => {
        test("Edit car test", async () => {
            const responseCreateCar = await carCtrl.createNewCar(DEFAULT_CAR)
            expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_CREATED)
            CAR_ID = (await responseCreateCar.json()).data.id
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
    test.describe('Get info about car by id tests', () => {
        test("Get info about car by id test", async () => {
            const responseCreateCar = await carCtrl.createNewCar(DEFAULT_CAR)
            const carBody = await expectedCarBody(responseCreateCar)
            CAR_ID = (await responseCreateCar.json()).data.id
            expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_CREATED)
            const responseCarById = await carCtrl.getUserCarById((await responseCreateCar.json()).data.id)
            expect(responseCarById.status()).toBe(HttpStatus.HTTP_OK)
            expect(carBody).toEqual((await responseCarById.json()).data)
        })
        test("Get info about not exist car", async () => {
            const responseCarById = await carCtrl.getUserCarById(INVALID_CAR_ID)
            expect(responseCarById.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
            expect(await responseCarById.json()).toEqual(CAR_NOT_FOUND)
        })
    })
    test.describe('Delete car tests', () => {
        test.only("Delete car by id test", async () => {
            const responseCreateCar = await carCtrl.createNewCar(DEFAULT_CAR)
            expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_CREATED)

            const responseDel = await carCtrl.deleteCar((await responseCreateCar.json()).data.id)
            expect(responseDel.status()).toBe(HttpStatus.HTTP_OK)
            expect(await responseDel.json()).toMatchObject({
                "status": "ok",
                "data": {
                    "carId": (await responseCreateCar.json()).data.id
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

