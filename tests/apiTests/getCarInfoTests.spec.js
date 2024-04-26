import {expect, test} from "@playwright/test";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {HttpStatus} from "../../src/data/httpStatus.ts";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {Users} from "../../src/data/Users.js";
import {DEFAULT_CAR, expectedCarBody,} from "../../src/fixtures/carApiFixtures.js";
import {AUTH_ERROR, CAR_NOT_FOUND} from "../../src/fixtures/carApiErrorMsgFxitures.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";

let carCtrl;
let authCtrl

let carId;
const INVALID_CAR_ID = "6666"

test.describe("Cars tests", () => {
    test.beforeEach("Preparation log in", async ({request}) => {
        carCtrl = new CarsControllers(request);
        authCtrl = new AuthControllers(request);
        const bodySignIn = await (await authCtrl.SigInUser(getUser(Users.userTom.email, Users.userTom.password))).json()
        expect(bodySignIn.status).toBe('ok')
    })
    test.afterEach("Delete car", async () => {
        await carCtrl.deleteCar(carId);
    })

    test.describe('Get current user cars tests', () => {
        test("Get current user cars test", async () => {
            const responseCreateCar = await carCtrl.createNewCar(DEFAULT_CAR)
            const carBody = await expectedCarBody(responseCreateCar)
            expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_CREATED)
            carId = (await responseCreateCar.json()).data.id
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
    test.describe('Get info about car by id tests', () => {
        test("Get info about car by id test", async () => {
            const responseCreateCar = await carCtrl.createNewCar(DEFAULT_CAR)
            const carBody = await expectedCarBody(responseCreateCar)
            carId = (await responseCreateCar.json()).data.id
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
})

