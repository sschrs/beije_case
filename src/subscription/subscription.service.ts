import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subscription } from "./subscription.entity";

@Injectable()
export class SubscriptionService {
    constructor(@InjectRepository(Subscription) private subscriptionRepository: Repository<Subscription>) { }

    /**
     * save a subscription object to database
     * @param subscription - Subscription object
     * @returns new subscription record with promise
     */
    save(subscription: Subscription): Promise<Subscription> {
        return this.subscriptionRepository.save(subscription);
    }

    /**
     * gets subscription by its id
     * @param id - subscription id
     * @returns a subscription with promise
     */
    getById(id: number): Promise<Subscription> {
        return this.subscriptionRepository.findOne({ where: { id }, relations: ['details'] });
    }

    /**
     * gets subscriptions of the user given its id
     * @param userId - user id of subscriptions
     * @returns a subscription array with promise
     */
    getByUserId(userId: number): Promise<Subscription[]> {
        return this.subscriptionRepository.find({ where: { user: { id: userId } }, relations: ['details'] });
    }

    /**
     * gets subscriptions by their nextOrder date
     * @param date - nextOrder Date
     * @returns a subscription array with promise
     */
    getByNextOrder(date: Date): Promise<Subscription[]> {
        return this.subscriptionRepository.find({ where: { nextOrder: date }, relations: ['details'] });
    }

    /**
     * update an exist subscription
     * @param subscription - Subscription object to use for update
     * @returns updated subscription
     */
    update(subscription: Subscription): Promise<Subscription> {
        return this.subscriptionRepository.save(subscription);
    }
}