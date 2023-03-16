import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiResponse } from "src/response/api.response";
import { ErrorResponse } from "src/response/error.response";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";

@Controller("orders")
export class OrderController{
    constructor(private orderService: OrderService){}

    @Post()
    async createOrder(@Body() order: Order){
        const newOrder = await this.orderService.save(order);
        if (!newOrder) throw new HttpException(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "an unexpected error occurred", "/orders"), HttpStatus.INTERNAL_SERVER_ERROR)
        return new ApiResponse(HttpStatus.CREATED, "order created successfully", "/orders", {newOrder})
    }

    @Get(":id")
    async getOrderById(@Param() params){
        const order = await this.orderService.getById(params.id);
        if (!order) throw new HttpException(new ErrorResponse(HttpStatus.NOT_FOUND, "order not found", `/orders/${params.id}`), HttpStatus.NOT_FOUND);
        return order;
    }

    @Get("/user/:userId")
    async getOrdersByUserId(@Param() params){
        const orders = await this.orderService.getByUserId(params.userId);
        if (orders.length <= 0) throw new HttpException(
            new ErrorResponse(HttpStatus.NOT_FOUND, "not found any order record for this user", `/orders/user/${params.userId}`),
            HttpStatus.NOT_FOUND);
        return orders;
    }
}