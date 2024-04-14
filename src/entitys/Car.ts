export class Car {
    private readonly _brand: string
    private readonly _model: string
    private readonly _mileage: string

    constructor(brand: string, model: string, mileage: string) {
        this._brand = brand;
        this._model = model;
        this._mileage = mileage;

    }

    get brand(): string {
        return this._brand;
    }

    get model(): string {
        return this._model;
    }

    get mileage(): string {
        return this._mileage;
    }
}