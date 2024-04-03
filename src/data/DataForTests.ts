export class DataForTests {

    static readonly MSG_EMPTY_NAME: string = 'Name required'
    static readonly MSG_INVALID_NAME: string = 'Name is invalid'
    static readonly MSG_OVER_LIMIT_NAME: string = 'Name has to be from 2 to 20 characters long'

    static readonly MSG_EMPTY_LAST_NAME: string = 'Last name required'
    static readonly MSG_INVALID_LAST_NAME: string = 'Last name is invalid'
    static readonly MSG_OVER_LIMIT_LAST_NAME: string = 'Last name has to be from 2 to 20 characters long'

    static readonly MSG_EMPTY_EMAIL: string = 'Email required'
    static readonly MSG_INVALID_EMAIL: string = 'Email is incorrect'

    static readonly MSG_EMPTY_PASS: string = 'Password required'
    static readonly MSG_INVALID_PASS: string = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'

    static readonly MSG_EMPTY_REPASS: string = 'Re-enter password required'
    static readonly MSG_PASS_NOT_MATCH: string = 'Passwords do not match'

    constructor() {

    }
}