import {expect, test} from "@playwright/test";
import {Users} from "../../src/data/Users.js";
import {BRANDS} from "../../src/data/Brands.ts";
import {MODELS} from "../../src/data/Models.ts";
import {HttpStatus} from "../../src/data/HttpStatus.js";

const CREATE_CAR_END_POINT = "/api/cars"
const SIGN_IN_END_POINT = "/api/auth/signin"
const DELETE_CAR_END_POINT = "/api/cars/"
let CAR_ID;
const NON_EXIST_BRAND = 777;
const NON_EXIST_MODEL = 777
const MILEAGE_OVER_MAX = 1000000;
const MILEAGE_LESS_MIN = - 1;
const DEFAULT_MILIAGE = 100;
const INVALID_MILEAGE_VALUE = 'HELLO';

test.describe("Cars API-> Create Cars", () => {
    test.beforeEach("SignIn", async ({request}) => {
        const requestBodySignIn = {
            "email": Users.userTom.email,
            "password": Users.userTom.password,
            "remember": false
        }
        const responseSignIn = await request.post(SIGN_IN_END_POINT, {
            data: requestBodySignIn
        })
        const bodySignIn = await responseSignIn.json()
        expect(bodySignIn.status).toBe('ok')
    })
    test.afterEach("Delete car", async ({request}) => {
        if (CAR_ID) {
            const responseDeleteCar = await request.delete(DELETE_CAR_END_POINT + CAR_ID)
            expect(responseDeleteCar.status()).toBe(HttpStatus.HTTP_OK)
        }
    })

    for (const brand of Object.values(BRANDS)) {
        for (const model of Object.values(MODELS[brand.id])) {
            test(`Create car with brand "${brand.title}" and model ${model.title}`, async ({request}) => {
                const requestBodyCreateCar = {
                    'carBrandId': brand.id,
                    'carModelId': model.id,
                    'mileage': Math.floor(Math.random() * 100)
                }
                const responseCreateCar = await request.post(CREATE_CAR_END_POINT, {
                    data: requestBodyCreateCar
                })
                const bodyCreateCar = await responseCreateCar.json()
                const expectedCreateCarBody = {
                    "id": expect.any(Number),
                    "carBrandId": brand.id,
                    "carModelId": model.id,
                    "initialMileage": requestBodyCreateCar.mileage,
                    "updatedMileageAt": expect.any(String),
                    "carCreatedAt": expect.any(String),
                    "mileage": requestBodyCreateCar.mileage,
                    "brand": brand.title,
                    "model": model.title,
                    "logo": `${brand.title.toLowerCase()}.png`
                }
                expect(bodyCreateCar.status).toBe('ok')
                expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_CREATED)
                expect(bodyCreateCar.data).toEqual(expectedCreateCarBody)
                CAR_ID = bodyCreateCar.data.id
            })
        }
    }
})
test.describe('Invalid tests for creation cars', () => {
    test.beforeEach("SignIn", async ({request}) => {
        const requestBodySignIn = {
            "email": Users.userTom.email,
            "password": Users.userTom.password,
            "remember": false
        }
        const responseSignIn = await request.post(SIGN_IN_END_POINT, {
            data: requestBodySignIn
        })
        const bodySignIn = await responseSignIn.json()
        expect(bodySignIn.status).toBe('ok')
    })
    test("Invalid mileage over 999999", async ({request}) => {
        const requestBodyCreateCar = {
            'carBrandId': BRANDS.Audu.id,
            'carModelId': MODELS["1"].A6.id,
            'mileage': MILEAGE_OVER_MAX
        }
        const responseCreateCar = await request.post(CREATE_CAR_END_POINT, {
            data: requestBodyCreateCar
        })
        const bodyCreateCar = await responseCreateCar.json()
        const expectedCreateCarBody = {
            "status": "error",
            "message": "Mileage has to be from 0 to 999999"
        }
        expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_BAD_REQUEST)
        expect(bodyCreateCar).toEqual(expectedCreateCarBody)
    })
    test("Invalid mileage less than 0", async ({request}) => {
        const requestBodyCreateCar = {
            'carBrandId': BRANDS.Audu.id,
            'carModelId': MODELS["1"].A6.id,
            'mileage': MILEAGE_LESS_MIN
        }
        const responseCreateCar = await request.post(CREATE_CAR_END_POINT, {
            data: requestBodyCreateCar
        })
        const bodyCreateCar = await responseCreateCar.json()
        const expectedCreateCarBody = {
            "status": "error",
            "message": "Mileage has to be from 0 to 999999"
        }
        expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_BAD_REQUEST)
        expect(bodyCreateCar).toEqual(expectedCreateCarBody)
    })
    test("Invalid type value mileage", async ({request}) => {
        const requestBodyCreateCar = {
            'carBrandId': BRANDS.Audu.id,
            'carModelId': MODELS["1"].A6.id,
            'mileage': INVALID_MILEAGE_VALUE
        }
        const responseCreateCar = await request.post(CREATE_CAR_END_POINT, {
            data: requestBodyCreateCar
        })
        const bodyCreateCar = await responseCreateCar.json()
        const expectedCreateCarBody = {
            "status": "error",
            "message": "Invalid mileage type"
        }
        expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_BAD_REQUEST)
        expect(bodyCreateCar).toEqual(expectedCreateCarBody)
    })
    test("Not exist brand", async ({request}) => {
        const requestBodyCreateCar = {
            'carBrandId': NON_EXIST_BRAND,
            'carModelId': MODELS["1"].A6.id,
            'mileage': DEFAULT_MILIAGE
        }
        const responseCreateCar = await request.post(CREATE_CAR_END_POINT, {
            data: requestBodyCreateCar
        })
        const bodyCreateCar = await responseCreateCar.json()
        const expectedCreateCarBody = {
            "status": "error",
            "message": "Brand not found"
        }
        expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
        expect(bodyCreateCar).toEqual(expectedCreateCarBody)
    })
    test("Not exist model", async ({request}) => {
        const requestBodyCreateCar = {
            'carBrandId': BRANDS.Audu.id,
            'carModelId': NON_EXIST_MODEL,
            'mileage': DEFAULT_MILIAGE
        }
        const responseCreateCar = await request.post(CREATE_CAR_END_POINT, {
            data: requestBodyCreateCar
        })
        const bodyCreateCar = await responseCreateCar.json()
        const expectedCreateCarBody = {
            "status": "error",
            "message": "Model not found"
        }
        expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_NOT_FOUND)
        expect(bodyCreateCar).toEqual(expectedCreateCarBody)
    })
})

test.describe('Create car', () => {
    test('Create car without authorization', async ({request}) => {
        const requestBodyCreateCar = {
            'carBrandId': BRANDS.Audu.id,
            'carModelId': MODELS["1"].A6.id,
            'mileage': DEFAULT_MILIAGE
        }
        const responseCreateCar = await request.post(CREATE_CAR_END_POINT, {
            data: requestBodyCreateCar
        })
        const bodyCreateCar = await responseCreateCar.json()
        const expectedCreateCarBody = {
            "status": "error",
            "message": "Not authenticated"
        }
        expect(responseCreateCar.status()).toBe(HttpStatus.HTTP_UNAUTHORIZED)
        expect(bodyCreateCar).toEqual(expectedCreateCarBody)
    })
})