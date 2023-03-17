import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { OrderDetail } from "src/order/order-detail.entity";
import { Order } from "src/order/order.entity";
import { OrderService } from "src/order/order.service";
import { PaymentService } from "src/payment/payment.service";
import { SubscriptionService } from "src/subscription/subscription.service";

@Injectable()
export class TaskService{
    // dependency injection: subscriptionService, orderService
    constructor(private subscriptionService: SubscriptionService, private orderService: OrderService, private paymentService: PaymentService){}

    private readonly logger = new Logger(TaskService.name);

    /**
     * tracks nextOrder dates of subscriptions that are the same as the current date each day
     * creates orders according to relevant subscriptions
     * updates the subscription's nextOrder date in accordance with the periodAsDay record
     */
    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    async handleSubscription(){
        // get current date
        const date = new Date();
        const currentDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

        // get subscriptions where nextOrder is equal to current date
        const subscriptions = await this.subscriptionService.getByNextOrder(currentDate);
        
        // checks if subscriptions exist
        if (subscriptions.length > 0){
            subscriptions.forEach(subscription => {
                // create new order and order detail list
                let order: Order = new Order();
                let orderDetails: OrderDetail[] = new Array();

                // match subscriptions to orders
                subscription.details.forEach(subscriptionDetail => {
                    let orderDetail: OrderDetail = new OrderDetail();
                    orderDetail.productId = subscriptionDetail.productId;
                    orderDetail.quantity = subscriptionDetail.quantity;
                    orderDetails.push(orderDetail);
                })
                order.addressId = subscription.addressId;
                order.userId = subscription.userId;
                order.orderMethod = "subscription";
                order.details = orderDetails;
                
                // payment check
                this.paymentService.getPayment(order).then(()=>{
                    // create a new order record
                    this.orderService.save(order).then(newOrder => {
                        // update nextOrder record of subscription according to periodAsDay
                        let nextOrder = new Date(currentDate);
                        nextOrder.setDate(nextOrder.getDate() + subscription.periodAsDay);
                        subscription.nextOrder = nextOrder;
                        this.subscriptionService.update(subscription);

                        // log new order
                        this.logger.log(`New order created from subscription -> SubscriptionId: ${subscription.id} OrderId: ${newOrder.id}`);
                    })
                })
            })
        }
    }
}