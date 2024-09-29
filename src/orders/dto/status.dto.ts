import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/enum.order";

export class StatusDto {
    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Possible status values are ${OrderStatusList}`
    })
    status: OrderStatus;
}