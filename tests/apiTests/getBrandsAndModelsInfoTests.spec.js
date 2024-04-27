import {expect, test} from "@playwright/test";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";
import {Users} from "../../src/data/Users.js";
import {BRAND_CAR} from "../../src/fixtures/brandCarFixtures.js";
import {MODEL_CAR} from "../../src/fixtures/modelCarFixtures.js";

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

    test("Get car brands test", async () => {
        const response = await carCtrl.getCarBrands()
        const body = await response.json()
        await expect(response).toBeOK()
        expect(body).toEqual(BRAND_CAR)
    })

    test("Get car brand by id test", async () => {
        const brand = BRAND_CAR.data[0]
        const response = await carCtrl.getCarBrandsById(brand.id)
        const body = await response.json()
        await expect(response).toBeOK()
        expect(body).toMatchObject({
            "status": "ok",
            "data": {
                "id": brand.id,
                "title": "Audi",
                "logoFilename": "audi.png"
            }
        });
    })

    test.describe('Get car models tests', () => {
        test("Get car models test", async () => {
            const response = await carCtrl.getModels()
            const body = await response.json()
            await expect(response).toBeOK()
            expect(body).toEqual(MODEL_CAR)
        })
    })

    test("Get car model by id test", async () => {
        const model = MODEL_CAR.data[0]
        const response = await carCtrl.getModelsById(model.id)
        const body = await response.json()
        await expect(response).toBeOK()
        expect(body).toMatchObject({
            "status": "ok",
            "data": {
                "id": model.id,
                "carBrandId": model.id,
                "title": "TT"
            }
        })
    })
})