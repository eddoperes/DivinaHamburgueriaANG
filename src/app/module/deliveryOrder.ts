import { DeliveryOrderMenuItem } from "./deliveryOrderMenuItem";

export interface DeliveryOrder {
    id : number,
    customerId : number | null,
    userId : number,
    state: number,
    payment: number,
    observation: string,
    total: number,
    deliveryOrderMenuItems: Array<DeliveryOrderMenuItem>
}