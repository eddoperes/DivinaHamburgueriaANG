export interface PurchaseOrderInventoryItem {
    id : number,
    inventoryItemId : number,
    unitPrice: number,
    quantity: number,
    totalPrice: number,
    stocked: boolean,
}
