import { HallOrderMenuItem } from "./hallOrderMenuItem";

export interface HallOrder {
    id : number,
    customerId : number | null,
    userId : number,
    state: number,
    observation: string,
    total: number,
    hallOrderMenuItems: Array< HallOrderMenuItem>
}