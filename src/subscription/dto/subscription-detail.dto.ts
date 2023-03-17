import { SubscriptionDetail } from "../subscription-detail.entity";

/**
 * Data Transfer Object for SubscriptionDetail
 */
export class SubscriptionDetailDTO{
    /**
     * get a SubscriptionDetail object and return its dto
     * @param detail - SubscriptionDetail
     */
    constructor(detail: SubscriptionDetail){
        this.id = detail.id;
        this.productId = detail.productId;
        this.quantity = detail.quantity;
    }
    id: number;
    productId: number;
    quantity: number;
}