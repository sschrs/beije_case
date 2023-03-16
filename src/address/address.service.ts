import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Address } from "./address.entity";

@Injectable()
export class AddressService {
    // dependency injection: addressRepository
    constructor(@InjectRepository(Address) private addressRepository: Repository<Address>) { }

    /**
     * saves an address object to database
     * @param address 
     * @returns inserted address object with promise
     */
    save(address: Address): Promise<Address> {
        return this.addressRepository.save(address);
    }

    /**
     * returns address record by id
     * @param id - address id
     * @returns an address object with promise
     */
    getById(id: number): Promise<Address>{
        return this.addressRepository.findOneBy({id});
    }

    /**
     * returns addresses belonging to a user
     * @param userId id of address's owner
     * @returns an address array with promise
     */
    getByUserId(userId: number): Promise<Address[]> {
        return this.addressRepository.find({ where: { user: { id: userId } } })
    }

}