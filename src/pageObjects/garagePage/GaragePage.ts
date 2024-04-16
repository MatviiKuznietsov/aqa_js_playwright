import {Locator, Page} from "@playwright/test";
import {BasePage} from "../BasePage";
import {AddNewCarPopUp} from "./components/AddNewCarPopUp";

export class GaragePage extends BasePage {
    readonly page: Page;
    readonly settingNavLink: Locator;
    readonly btnRemoveMyAccount: Locator;
    readonly btnRemove: Locator;
    readonly btnAddCar: Locator;
    readonly labelCar: Locator
    readonly profileNavLink: Locator
    readonly profileNameLable: Locator

    public constructor(page: Page) {
        super(page, "/panel/garage");
        this.page = page;
        this.settingNavLink = page.locator(' a[routerlink=\'settings\']')
        this.btnRemoveMyAccount = page.locator('.btn-danger-bg')
        this.btnRemove = page.locator('.btn-danger')
        this.btnAddCar = page.locator('.panel-page_heading button')
        this.labelCar = page.locator('.car-list li:first-child .car_name.h2')
        this.profileNavLink = page.locator('a[routerlink=\'profile\']')
        this.profileNameLable = page.locator('p.profile_name')
    }

    async removeUser() {
        await this.settingNavLink.click()
        await this.btnRemoveMyAccount.click()
        await this.btnRemove.click()
    }

    async openAddCarPopUp() {
        await this.btnAddCar.click()
        return new AddNewCarPopUp(this.page)
    }
}