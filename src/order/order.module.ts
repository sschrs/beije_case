import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetail } from "./order-detail.entity";
import { Order } from "./order.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderDetail])],
    exports: [TypeOrmModule]
})
export class OrderModule{}