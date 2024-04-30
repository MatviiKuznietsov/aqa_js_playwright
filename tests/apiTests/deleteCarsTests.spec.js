import {expect, test} from "@playwright/test";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";
import {Users} from "../../src/data/Users.js";
import {DEFAULT_CAR, EMPTY_LIST_CARS} from "../../src/fixtures/carApiFixtures.js";
import {HttpStatus} from "../../src/data/httpStatus.js";

let carCtrl;
let authCtrl

let carId;

test.describe("Delete cars tests", () => {
    test.beforeEach("Preparation log in", async ({request}) => {
        carCtrl = new CarsControllers(request);
        authCtrl = new AuthControllers(request);
        const bodySignIn = await (await authCtrl.sigInUser(getUser(Users.userBen.email, Users.userBen.password))).json()
        expect(bodySignIn.status).toBe('ok')
    })

    test.afterEach("Delete car", async () => {
        await carCtrl.deleteCar(carId);
    })

    test("Delete car by id test", async () => {
        const responseCreateCar = await carCtrl.createNewCar(DEFAULT_CAR)
        expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_CREATED)
        const carResponse = (await responseCreateCar.json()).data

        const responseDel = await carCtrl.deleteCar(carResponse.id)
        const bodyDel = await responseDel.json()
        expect(responseDel.status()).toBe(HttpStatus.HTTP_OK)
        expect(bodyDel).toMatchObject({
            "status": "ok",
            "data": {
                "carId": carResponse.id
            }
        })
        const response = await carCtrl.getCurrentUserCar()
        const body = await response.json()
        await expect(response).toBeOK()
        expect(body).toEqual(EMPTY_LIST_CARS)
    })
})