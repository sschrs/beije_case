import { Module } from "@nestjs/common";
import { OrderModule } from "src/order/order.module";
import { PaymentModule } from "src/payment/payment.module";
import { SubscriptionModule } from "src/subscription/subscription.module";
import { TaskService } from "./task.service";

@Module({
    providers: [TaskService],
    imports: [SubscriptionModule, OrderModule, PaymentModule]
})
export class TaskModule{}