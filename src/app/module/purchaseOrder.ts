import { PurchaseOrderInventoryItem } from "./purchaseOrderInventoryItem";

export interface PurchaseOrder {
    id : number,
    providerId : number,
    state: number,
    observation: string,
    payment: number,
    total: number,
    purchaseOrderInventoryItems: Array< PurchaseOrderInventoryItem>
}
