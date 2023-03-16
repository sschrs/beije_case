import { IsEmail, IsNotEmpty } from "class-validator";
import { Address } from "src/address/address.entity";
import { Order } from "src/order/order.entity";
import { Subscription } from "src/subscription/subscription.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    surname: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    phoneNumber: string;

    //relations
    @OneToMany(type => Address, address => address.user, { cascade: ['insert', 'update'] })
    addresses: Address[];

    @OneToMany(type => Order, order => order.user, { cascade: ['insert', 'update'] })
    orders: Order[];

    @OneToMany(type => Subscription, subscription => subscription.user, { cascade: ['insert', 'update'] })
    subscriptions: Subscription[];

    @CreateDateColumn()
    createdAt: Date;
}