import { IsIn, IsNotEmpty, IsNotEmptyObject, IsNumber } from "class-validator";
import { Address } from "src/address/address.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./order-detail.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsIn(['one-time', 'subscription'])
    orderMethod: "one-time" | "subscription";

    @Column()
    @IsNotEmpty()
    discount: number;

    @Column()
    @IsIn(['reveived', 'inProgress', 'shipped', 'completed'])
    orderStatus: "reveived" | "inProgress" | "shipped" | "completed"

    @CreateDateColumn()
    orderDate: Date;

    //relations
    @OneToMany(type => OrderDetail, orderDetail => orderDetail.order, { cascade: ['insert', 'update'] })
    @IsNotEmpty()
    details: OrderDetail[];

    @ManyToOne(type => User, user => user.orders, { cascade: ['insert', 'update'] })
    @IsNotEmptyObject()
    user: User;
    @Column()
    userId: number;

    @ManyToOne(type => Address, address => address.orders, { cascade: ['insert', 'update'] })
    address: Address;
    @Column()
    addressId: number;
}