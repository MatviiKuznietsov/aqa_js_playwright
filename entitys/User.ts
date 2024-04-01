export class User {
    readonly _name: string
    readonly _lastName: string
    readonly _email: string
    readonly _password: string

    constructor(name: string, lastName: string, email: string, password: string) {
        this._name = name;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
    }

    get name(): string {
        return this._name;
    }

    get lastName(): string {
        return this._lastName;
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }
}