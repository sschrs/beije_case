import { IsPositive } from "class-validator";
import { Product } from "src/product/product.entitiy";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsPositive()
    quantity: number;

    //relations
    @ManyToOne(type => Product, product => product.orders, { cascade: ['insert', 'update'] })
    product: Product;
    @Column()
    productId: number;

    @ManyToOne(type => Order, order => order.details)
    order: Order;
}