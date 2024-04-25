import {BaseController} from "./BaseController";
import {APIRequestContext, request} from "@playwright/test";
import {EndPoints} from "../data/endPoints";

export class AuthControllers extends BaseController {
    constructor(request: APIRequestContext) {
        super(request);
    }

    async SigInUser(requestBody: {}) : Promise<any>{
       return  await this.request.post(EndPoints.SIGN_IN_END_POINT, {data: requestBody})
    }
    async LogOutUser() : Promise<any>{
        return  await this.request.get(EndPoints.LOG_OUT_END_POINT)
    }
}