import { IsNotEmpty, IsPositive } from "class-validator";
import { Address } from "src/address/address.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionDetail } from "./subscription-detail.entity";

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsPositive()
    periodAsDay: number;

    @Column()
    @IsNotEmpty()
    nextOrder: Date;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    //relations
    @ManyToOne(type => User, user => user.subscriptions, { cascade: ['insert', 'update'] })
    user: User;
    @Column()
    userId: number;

    @OneToMany(type => SubscriptionDetail, subscriptionDetail => subscriptionDetail.subscription, { cascade: ['insert', 'update'] })
    details: SubscriptionDetail[];

    @ManyToOne(type => Address, { cascade: ['insert', 'update'] })
    address: Address;
    @Column()
    addressId: number;
}