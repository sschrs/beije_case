import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entitiy";

@Injectable()
export class ProductService{
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>){}

    /**
     * saves product object to database
     * @param product - product object
     * @returns inserted product with promise
     */
    save(product: Product): Promise<Product>{
        return this.productRepository.save(product)
    }
}