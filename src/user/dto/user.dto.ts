import { User } from "../user.entity";

export class UserDTO{
    /**
     * creates a UserDTO from User object
     * @param user - User object
     */
    constructor(user: User){
        this.name = user.name;
        this.surname = user.surname;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
    }
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
}