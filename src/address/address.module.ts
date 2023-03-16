import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressController } from "./address.controller";
import { Address } from "./address.entity";
import { AddressService } from "./address.service";

@Module({
    imports: [TypeOrmModule.forFeature([Address])],
    exports: [TypeOrmModule],
    providers: [AddressService],
    controllers: [AddressController]
})
export class AddressModule{}