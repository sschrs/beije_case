import { Subscription } from "../subscription.entity";
import { SubscriptionDetailDTO } from "./subscription-detail.dto";

/**
 * Data Transfer Object for Subscription class
 */
export class SubscriptionDTO{
    /**
     * get a Subscription object and returns its dto
     * @param subscription Subscription object
     */
    constructor(subscription: Subscription){
        this.id = subscription.id;
        this.periodAsDay = subscription.periodAsDay;
        this.userId = subscription.userId;
        this.addressId = subscription.addressId;
        this.createdAt = subscription.createdAt;
        this.details = new Array();
        subscription.details.forEach(detail => {
            this.details.push(new SubscriptionDetailDTO(detail));
        })
    }
    id: number;
    periodAsDay: number;
    nextOrder: Date;
    userId: number;
    addressId: number;
    createdAt: Date;
    details: SubscriptionDetailDTO[];
}