import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionDetail } from "./subscription-detail.entity";
import { SubscriptionController } from "./subscription.controller";
import { Subscription } from "./subscription.entity";
import { SubscriptionService } from "./subscription.service";

@Module({
    imports: [TypeOrmModule.forFeature([Subscription, SubscriptionDetail])],
    exports: [TypeOrmModule],
    providers: [SubscriptionService],
    controllers: [SubscriptionController]
})
export class SubscriptionModule { }