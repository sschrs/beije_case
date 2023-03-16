import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionDetail } from "./subscription-detail.entity";
import { Subscription } from "./subscription.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Subscription, SubscriptionDetail])],
    exports: [TypeOrmModule]
})
export class SubscriptionModule { }