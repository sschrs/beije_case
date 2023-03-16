import { IsNotEmpty, IsPositive } from "class-validator";
import { OrderDetail } from "src/order/order-detail.entity";
import { SubscriptionDetail } from "src/subscription/subscription-detail.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsNotEmpty()
    slug: string;

    @Column()
    @IsNotEmpty()
    description: string;

    @Column()
    @IsPositive()
    price: number;

    //relations
    @OneToMany(type => OrderDetail, orderDetail => orderDetail.product)
    orders: OrderDetail[];
    
    @OneToMany(type => SubscriptionDetail, subscriptionDetail => subscriptionDetail.product)
    subscriptions: SubscriptionDetail[];

    @CreateDateColumn()
    createdAt: Date;
}