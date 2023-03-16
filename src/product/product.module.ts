import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";
import { Product } from "./product.entitiy";
import { ProductService } from "./product.service";

@Module({
    imports: [ TypeOrmModule.forFeature([Product]) ],
    exports: [TypeOrmModule],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule{}