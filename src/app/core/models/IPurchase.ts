import { IPurchaseProduct } from "./IPurchaseProduct";

export interface IPurchase {
    id: string;
    fullname:      string;
    products:      IPurchaseProduct[];
    totalAmount:   number;
    shipment:      string | null;
    merchantOrder: string | null;
    paymentStatus: string | null;
}