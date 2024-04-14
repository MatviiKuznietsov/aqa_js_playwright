import {BaseComponent} from "../../../components/BaseComponent";
import {Locator, Page} from "@playwright/test";
import {Car} from "../../../entitys/Car";

export class AddNewCarPopUp extends BaseComponent {
    readonly page: Page;

    readonly dropdownBrand: Locator;
    readonly dropdownModel: Locator;
    readonly inputMileage: Locator;
    readonly btnAdd: Locator;

    constructor(page: Page) {
        super(page, page.locator('app-add-car-modal'));

        this.dropdownBrand = this.container.locator('#addCarBrand')
        this.dropdownModel = this.container.locator('#addCarModel')
        this.inputMileage = this.container.locator('#addCarMileage')
        this.btnAdd = this.container.locator('.btn-primary')
    }

    async addNewCar(car: Car) {
        await this.dropdownBrand.selectOption(car.brand)
        await this.dropdownModel.selectOption(car.model)
        await this.inputMileage.fill(car.mileage)
        await this.btnAdd.click()
    }
}