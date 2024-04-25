import {EndPoints} from "../data/EndPoints";
import {APIRequestContext, APIResponse} from "@playwright/test";
import {BaseController} from "./BaseController";

export class CarsControllers extends BaseController {
    constructor(request: APIRequestContext) {
        super(request)
    }

    async getCarBrands(): Promise<APIResponse> {
        return await this.request.get(EndPoints.BRAND_END_POINT);
    }

    async getCarBrandsById(id: number): Promise<any> {
        return await this.request.get(EndPoints.BRAND_END_POINT + id);
    }

    async getModels(): Promise<APIResponse> {
        return await this.request.get(EndPoints.MODELS_END_POINT);
    }

    async getModelsById(id: string): Promise<any> {
        return await this.request.get(EndPoints.MODELS_END_POINT + id);
    }

    async getCurrentUserCar(): Promise<any> {
        return await this.request.get(EndPoints.CAR_END_POINT);
    }

    async createNewCar(newCar): Promise<any> {
        return await this.request.post(EndPoints.CAR_END_POINT, {data: newCar});
    }

    async getUserCarById(id: string): Promise<any> {
        return await this.request.get(EndPoints.CAR_END_POINT + id);
    }

    async editExistingCar(id: string, carData: any): Promise<any> {
        return await this.request.put(EndPoints.CAR_END_POINT + id, {data: carData});
    }

    async deleteCar(id: string): Promise<any> {
        if (id !== undefined && id !== '') {
            return await this.request.delete(EndPoints.CAR_END_POINT + id);
        }
    }

}