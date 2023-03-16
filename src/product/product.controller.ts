import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse } from "src/response/api.response";
import { ErrorResponse } from "src/response/error.response";
import { Product } from "./product.entitiy";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController{
    // dependency injection: productService
    constructor(private productService: ProductService){}

    /**
     * creates new product in db
     * @param product - product object from json data
     * @returns inserted product with api response
     */
    @Post()
    async createProduct(@Body() product: Product){
        const newProduct = await this.productService.save(product);
        if (!newProduct) throw new HttpException(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "an unexpected error occurred", "/products"), HttpStatus.INTERNAL_SERVER_ERROR);
        return new ApiResponse(HttpStatus.OK, "product created successfully", "/products", {newProduct});
    }
}