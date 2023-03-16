import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiResponse } from "src/response/api.response";
import { ErrorResponse } from "src/response/error.response";
import { Address } from "./address.entity";
import { AddressService } from "./address.service";

@Controller("addresses")
export class AddressController {
    // dependency injection: addressService
    constructor(private addressService: AddressService) { }

    /**
     * create a new address in database
     * @param address - address object from json data
     * @returns inserted address object
     */
    @Post()
    async createAddress(@Body() address: Address) {
        const newAddress = await this.addressService.save(address);
        if (!newAddress) throw new HttpException(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "an unexpected error occurred", "/addresses"), HttpStatus.INTERNAL_SERVER_ERROR)
        return new ApiResponse(HttpStatus.OK, "address created successfully", "/addresses", { newAddress });
    }

    /**
     * get address by its id
     * @param params - parameter from url path
     * @returns address object
     */
    @Get(":id")
    async getAddressById(@Param() params){
        const address = await this.addressService.getById(params.id);
        if (!address) throw new HttpException(new ErrorResponse(HttpStatus.NOT_FOUND, "address not found", `/addresses/${params.id}`), HttpStatus.NOT_FOUND);
        return address;
    }
    
    /**
     * find all addresses for a user
     * @param params - user id parameter from url path
     * @returns address list for given user
     */
    @Get("/user/:userId")
    async getAddressesByUserId(@Param() params){
        const addresses = await this.addressService.getByUserId(params.userId);
        if (addresses.length <= 0) throw new HttpException(
            new ErrorResponse(HttpStatus.NOT_FOUND, "not found any address record for this user", `/addresses/user/${params.userId}`),
            HttpStatus.NOT_FOUND)
        return addresses;
    }
    
}