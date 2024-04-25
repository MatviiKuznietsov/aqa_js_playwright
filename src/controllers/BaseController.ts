import {APIRequestContext} from "@playwright/test";

export class BaseController {
    readonly request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request;
    }
}