import {expect, test} from "@playwright/test";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";
import {Users} from "../../src/data/Users.js";
import {BRAND_CAR} from "../../src/fixtures/brandCarFixtures.js";
import {HttpStatus} from "../../src/data/httpStatus.js";
import {NOT_FOUND_BRANDS_WITH_ID} from "../../src/fixtures/carApiErrorMsgFxitures.js";
import {MODEL_CAR} from "../../src/fixtures/modelCarFixtures.js";

let carCtrl;
let authCtrl
let carId;

const INVALID_BRAND_ID = 5555
const INVALID_MODEL_ID = 6666
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
    test.describe('Get car brand tests', () => {
        test("Get car brands test", async () => {
            const response = await carCtrl.getCarBrands()
            await expect(response).toBeOK()
            expect(await response.json()).toEqual(BRAND_CAR)
        })
    })
    test.describe('Get car brand by id tests', () => {
        test("Get car brand by id test", async () => {
            const brand = BRAND_CAR.data[0]
            const response = await carCtrl.getCarBrandsById(brand.id)
            await expect(response).toBeOK()
            expect(await response.json()).toMatchObject({
                "status": "ok",
                "data": {
                    "id": brand.id,
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
            const model = MODEL_CAR.data[0]
            const response = await carCtrl.getModelsById(model.id)
            await expect(response).toBeOK()
            expect(await response.json()).toMatchObject({
                "status": "ok",
                "data": {
                    "id": model.id,
                    "carBrandId": model.id,
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
})