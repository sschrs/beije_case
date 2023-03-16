import { IsNotEmpty } from "class-validator";
import { Order } from "src/order/order.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    addressTitle: string;

    @Column()
    @IsNotEmpty()
    city: string;

    @Column()
    @IsNotEmpty()
    district: string;

    @Column()
    @IsNotEmpty()
    details: string;

    @Column()
    @IsNotEmpty()
    postCode: number;

    //relations
    @ManyToOne(type => User, user => user.addresses, { cascade: ['insert', 'update'] })
    user: User;

    @OneToMany(type => Order, order => order.address, { cascade: ['insert', 'update'] })
    orders: Order[];

    @CreateDateColumn()
    createdAt: Date;
}