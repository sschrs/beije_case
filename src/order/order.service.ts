import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./order.entity";

@Injectable()
export class OrderService{
    // dependency injection: orderRepository
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>){}

    /**
     * saves given order object to database
     * @param order - order object
     * @returns new order record with promise
     */
    save(order: Order): Promise<Order>{
        return this.orderRepository.save(order);
    }

    /**
     * gets an order by its id
     * @param id - order id
     * @returns the order object with promise
     */
    getById(id: number): Promise<Order>{
        return this.orderRepository.findOne({where: {id}, relations: ['details', 'address']})
    }

    /**
     * gets orders by user id
     * @param userId - user id of order
     * @returns an order array
     */
    getByUserId(userId: number): Promise<Order[]>{
        return this.orderRepository.find({ where: { user: { id: userId } }, relations: ['details', 'address'] })
    }
}