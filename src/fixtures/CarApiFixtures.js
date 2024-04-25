import {expect} from "@playwright/test";

export const BRAND_CAR = {
    "status": "ok",
    "data":
        [
            {
                "id": 1,
                "title": "Audi",
                "logoFilename": "audi.png"
            },
            {
                "id": 2,
                "title": "BMW",
                "logoFilename": "bmw.png"
            },
            {
                "id": 3,
                "title": "Ford",
                "logoFilename": "ford.png"
            },
            {
                "id": 4,
                "title": "Porsche",
                "logoFilename": "porsche.png"
            },
            {
                "id": 5,
                "title": "Fiat",
                "logoFilename": "fiat.png"
            }
        ]
}

export const MODEL_CAR = {
    "status": "ok",
    "data": [
        {
            "id": 1,
            "carBrandId": 1,
            "title": "TT"
        },
        {
            "id": 2,
            "carBrandId": 1,
            "title": "R8"
        },
        {
            "id": 3,
            "carBrandId": 1,
            "title": "Q7"
        },
        {
            "id": 4,
            "carBrandId": 1,
            "title": "A6"
        },
        {
            "id": 5,
            "carBrandId": 1,
            "title": "A8"
        },
        {
            "id": 6,
            "carBrandId": 2,
            "title": "3"
        },
        {
            "id": 7,
            "carBrandId": 2,
            "title": "5"
        },
        {
            "id": 8,
            "carBrandId": 2,
            "title": "X5"
        },
        {
            "id": 9,
            "carBrandId": 2,
            "title": "X6"
        },
        {
            "id": 10,
            "carBrandId": 2,
            "title": "Z3"
        },
        {
            "id": 11,
            "carBrandId": 3,
            "title": "Fiesta"
        },
        {
            "id": 12,
            "carBrandId": 3,
            "title": "Focus"
        },
        {
            "id": 13,
            "carBrandId": 3,
            "title": "Fusion"
        },
        {
            "id": 14,
            "carBrandId": 3,
            "title": "Mondeo"
        },
        {
            "id": 15,
            "carBrandId": 3,
            "title": "Sierra"
        },
        {
            "id": 16,
            "carBrandId": 4,
            "title": "911"
        },
        {
            "id": 17,
            "carBrandId": 4,
            "title": "Cayenne"
        },
        {
            "id": 18,
            "carBrandId": 4,
            "title": "Panamera"
        },
        {
            "id": 19,
            "carBrandId": 5,
            "title": "Palio"
        },
        {
            "id": 20,
            "carBrandId": 5,
            "title": "Ducato"
        },
        {
            "id": 21,
            "carBrandId": 5,
            "title": "Panda"
        },
        {
            "id": 22,
            "carBrandId": 5,
            "title": "Punto"
        },
        {
            "id": 23,
            "carBrandId": 5,
            "title": "Scudo"
        }
    ]
}

export function getBrandByID(id) {
    return {
        "status": "ok",
        "data": {
            "id": id,
            "title": "Audi",
            "logoFilename": "audi.png"
        }
    }
}

export function getModelByID(id) {
    return {
        "status": "ok",
        "data": {
            "id": id,
            "carBrandId": id,
            "title": "TT"
        }
    }
}

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
export function getResponceDeletedCar(id) {
    return {
        "status": "ok",
        "data": {
            "carId": id
        }
    }
}



