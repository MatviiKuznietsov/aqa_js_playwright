import {Users} from "../data/Users.js";

export function getUser(email, pass){
    return{
        "email": email,
        "password": pass,
        "remember": false
    }
}
