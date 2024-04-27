import {expect} from "@playwright/test";


export const DEFAULT_CAR = {
    'carBrandId': 1,
    'carModelId': 2,
    'mileage': 100
}
export const DEFAULT_CAR_INVALID = {
    'carBrandId': 1000,
    'carModelId': 2,
    'mileage': 100
}
export const DEFAULT_CAR_RESPONSE = {
    "id": expect.any(Number),
    "carBrandId": DEFAULT_CAR.carBrandId,
    "carModelId": DEFAULT_CAR.carModelId,
    "initialMileage": expect.any(Number),
    "updatedMileageAt": expect.any(String),
    "carCreatedAt": expect.any(String),
    "mileage": DEFAULT_CAR.mileage,
    "brand": expect.any(String),
    "model": expect.any(String),
    "logo": expect.any(String)
}

export const DEFAULT_CAR_WITH_CHANGES = {
    'carBrandId': 2,
    'carModelId': 8,
    'mileage': 150
}
export const DEFAULT_CAR_WITH_CHANGES_RESPONSE = {
    "id": expect.any(Number),
    "carBrandId": DEFAULT_CAR_WITH_CHANGES.carBrandId,
    "carModelId": DEFAULT_CAR_WITH_CHANGES.carModelId,
    "initialMileage": expect.any(Number),
    "updatedMileageAt": expect.any(String),
    "carCreatedAt": expect.any(String),
    "mileage": DEFAULT_CAR_WITH_CHANGES.mileage,
    "brand": expect.any(String),
    "model": expect.any(String),
    "logo": expect.any(String)
}

export const EMPTY_LIST_CARS = {
    "status": "ok",
    "data": []
}

export async function expectedCarBody(responseCreateCar) {
    const responseCarBody = await responseCreateCar.json()
    return {
        "id": responseCarBody.data.id,
        "carBrandId": responseCarBody.data.carBrandId,
        "carModelId": responseCarBody.data.carModelId,
        "initialMileage": responseCarBody.data.initialMileage,
        "updatedMileageAt": expect.any(String),
        "carCreatedAt": expect.any(String),
        "mileage": responseCarBody.data.mileage,
        "brand": responseCarBody.data.brand,
        "model": responseCarBody.data.model,
        "logo": expect.any(String)
    }
}

export function getRequestBody(brandId, modelId, mileage) {
    return{
        'carBrandId': brandId,
        'carModelId': modelId,
        'mileage': mileage
    }
}

export function getExpectedCreateBody(brand, model, mileage) {
    return{
        "id": expect.any(Number),
        "carBrandId": brand.id,
        "carModelId": model.id,
        "initialMileage": mileage,
        "updatedMileageAt": expect.any(String),
        "carCreatedAt": expect.any(String),
        "mileage": mileage,
        "brand": brand.title,
        "model": model.title,
        "logo": `${brand.title.toLowerCase()}.png`
    }
}



