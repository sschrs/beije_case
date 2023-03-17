import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiResponse } from "src/response/api.response";
import { ErrorResponse } from "src/response/error.response";
import { UserDTO } from "./dto/user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("users")
export class UserController{
    // dependency injection: userService
    constructor(private userService: UserService){}

    /**
     * creates a new user in the database based on the data sent
     * @param user - User object from json data
     * @returns an ApiResponse with new user
     */
    @Post()
    async createUser(@Body() user: User){
        const newUser = await this.userService.save(user);
        if (!newUser) throw new HttpException(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "an unexpected error occurred", "/users"),HttpStatus.INTERNAL_SERVER_ERROR)
        
        return new ApiResponse(HttpStatus.CREATED, "user created successfully", "/users", {newUser: new UserDTO(newUser)});
    }

    /**
     * finds a user by its id and return a UserDTO object
     * @param params - parameter from url path
     * @returns a UserDTO object
     */
    @Get(":id")
    async getUser(@Param() params){
        const user = await this.userService.getById(params.id);
        if (!user) throw new HttpException(new ErrorResponse(HttpStatus.NOT_FOUND, "user not found", `users/${params.id}`), HttpStatus.NOT_FOUND);
        return new UserDTO(user);
    }
}