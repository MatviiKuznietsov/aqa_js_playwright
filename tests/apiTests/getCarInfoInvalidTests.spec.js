import {expect, test} from "@playwright/test";
import {CarsControllers} from "../../src/controllers/CarsControllers.js";
import {AuthControllers} from "../../src/controllers/AuthControllers.js";
import {getUser} from "../../src/fixtures/usersFixtures.js";
import {Users} from "../../src/data/Users.js";
import {HttpStatus} from "../../src/data/httpStatus.js";
import {AUTH_ERROR, CAR_NOT_FOUND} from "../../src/fixtures/carApiErrorMsgFxitures.js";

let carCtrl;
let authCtrl

let carId;
const INVALID_CAR_ID = "6666"

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

    test("Get logOut User cars", async () => {
        await authCtrl.logOutUser();
        const responseCurrenUserCars = await carCtrl.getCurrentUserCar()
        const bodyCurrenUserCars = await responseCurrenUserCars.json()

        expect(responseCurrenUserCars.status()).toBe(HttpStatus.HTTP_UNAUTHORIZED)
        expect(bodyCurrenUserCars).toEqual(AUTH_ERROR)
    })

    test("Get info about not exist car", async () => {
        const responseCarById = await carCtrl.getUserCarById(INVALID_CAR_ID)
        const bodyCarById = await responseCarById.json()

        expect(responseCarById.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
        expect(bodyCarById).toEqual(CAR_NOT_FOUND)
    })
})