import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { encrypt } from "src/shared/encryption.helper";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    // userRepository injection
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    /**
     * saves a user object to database
     * @param user - User object
     * @returns an inserted user data with a promise
     */
    async save(user: User): Promise<User>{
        user.password = await encrypt(user.password);
        return this.userRepository.save(user);
    }

    /**
     * gets a user by id
     * @param id - user id to get
     * @returns - a user object with a promise
     */
    getById(id: number): Promise<User>{
        return this.userRepository.findOneBy({id});
    }
}