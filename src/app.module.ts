import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // get env variables from .env file
    ScheduleModule.forRoot(), // for cron jobs and task scheduling
    // database configuration
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: (process.env.DATABASE_PORT as unknown as number),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true
    }),
    //modules
    UserModule,
    AddressModule,
    OrderModule,
    ProductModule,
    SubscriptionModule,
    TaskModule,
    PaymentModule
  ] 
})
export class AppModule {
  //inject data source
  constructor(private dataSource: DataSource){}
}
