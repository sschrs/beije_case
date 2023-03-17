import { Injectable } from "@nestjs/common";
import { Order } from "src/order/order.entity";

@Injectable()
export class PaymentService{

    // a dummy get payment method that always returns success
    getPayment(order: Order): Promise<boolean>{
        return new Promise((resolve, reject)=>{
            resolve(true);
        })
    }

}