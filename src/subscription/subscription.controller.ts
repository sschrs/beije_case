import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiResponse } from "src/response/api.response";
import { ErrorResponse } from "src/response/error.response";
import { SubscriptionDTO } from "./dto/subscription.dto";
import { Subscription } from "./subscription.entity";
import { SubscriptionService } from "./subscription.service";

@Controller("subscriptions")
export class SubscriptionController{
    // dependency injection: subscriptionService
    constructor(private subscriptionService: SubscriptionService){}

    /**
     * create a subscription and return its dto
     * @param subscription object from json data
     * @returns a dto of created subscription with api response
     */
    @Post()
    async createSubscription(@Body() subscription: Subscription){
        const newSubs = await this.subscriptionService.save(subscription);
        if (!newSubs) throw new HttpException(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "an unexpected error occurred", "/subscriptions"), HttpStatus.INTERNAL_SERVER_ERROR);
        return new ApiResponse(HttpStatus.CREATED, "subscription created successfully", "/subscriptions", { newSubscription: new SubscriptionDTO(newSubs) })
    }

    /**
     * get subscription by its id
     * @param params parameters from url path
     * @returns a subscription dto
     */
    @Get(":id")
    async getSubscriptionById(@Param() params){
        const subs = await this.subscriptionService.getById(params.id);
        if (!subs) throw new HttpException(new ErrorResponse(HttpStatus.NOT_FOUND, "subscription not found", "/subscriptions"), HttpStatus.NOT_FOUND);
        return new SubscriptionDTO(subs);
    }

    /**
     * get subscriptions by its user id
     * @param params parameters from url path
     * @returns a subscription dto list
     */
    @Get("/user/:userId")
    async getSubscriptionByUserId(@Param() params){
        const subsList = await this.subscriptionService.getByUserId(params.userId);

        if (subsList.length <= 0) throw new HttpException(
            new ErrorResponse(HttpStatus.NOT_FOUND, "not found any subscription record for this user", `/subscriptions/user/${params.userId}`),
            HttpStatus.NOT_FOUND);

        let subscriptions: SubscriptionDTO[] = new Array();
        subsList.forEach(subs => {
            subscriptions.push(new SubscriptionDTO(subs));
        })
        return subscriptions;
    }
}