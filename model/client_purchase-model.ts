export interface ClientPurchaseModel {
    numOfPurchases: number,
    productSKU: string
    clientId: number,
    paidAmount: string,
    discountPercentage: number,
    time: TimeRanges,
    date: Date
}
