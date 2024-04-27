import {expect, test} from "@playwright/test";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {HttpStatus} from "../../src/data/httpStatus.ts";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {Users} from "../../src/data/Users.js";
import {DEFAULT_CAR, expectedCarBody,} from "../../src/fixtures/carApiFixtures.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";

let carCtrl;
let authCtrl

let carId;
test.describe("Cars tests", () => {

    test.beforeEach("Preparation log in", async ({request}) => {
        carCtrl = new CarsControllers(request);
        authCtrl = new AuthControllers(request);
        const bodySignIn = await (await authCtrl.sigInUser(getUser(Users.userTom.email, Users.userTom.password))).json()
        expect(bodySignIn.status).toBe('ok')
    })

    test.afterEach("Delete car", async () => {
        await carCtrl.deleteCar(carId);
    })

    test("Get current user cars test", async () => {
        const responseCreateCar = await carCtrl.createNewCar(DEFAULT_CAR)
        const bodyCreateCar = await responseCreateCar.json()
        const expectedCars = await expectedCarBody(responseCreateCar)
        expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_CREATED)
        carId = bodyCreateCar.data.id

        const responseCurrenUserCars = await carCtrl.getCurrentUserCar()
        const actualCar = (await responseCurrenUserCars.json()).data[0]
        await expect(responseCurrenUserCars).toBeOK()
        expect(actualCar).toEqual(expectedCars)
    })

    test("Get info about car by id test", async () => {
        const responseCreateCar = await carCtrl.createNewCar(DEFAULT_CAR)
        const bodyCreateCar = await responseCreateCar.json()
        const expectedCar = await expectedCarBody(responseCreateCar)
        carId = (bodyCreateCar).data.id
        expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_CREATED)

        const responseCarById = await carCtrl.getUserCarById((await responseCreateCar.json()).data.id)
        const actualCarById = await responseCarById.json()
        expect(responseCarById.status()).toBe(HttpStatus.HTTP_OK)
        expect(actualCarById.data).toEqual((expectedCar))
    })
})

