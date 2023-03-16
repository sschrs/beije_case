import { IsPositive } from "class-validator";
import { Product } from "src/product/product.entitiy";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subscription } from "./subscription.entity";

@Entity()
export class SubscriptionDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsPositive()
    quantity: number;

    //relations
    @ManyToOne(type => Subscription, subscription => subscription.details, { cascade: ['insert', 'update'] })
    subscription: Subscription;

    @ManyToOne(type => Product, { cascade: ['insert', 'update'] })
    product: Product;
    @Column()
    productId: number;
}