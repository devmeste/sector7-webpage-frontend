import { IPurchase } from "./IPurchase";

export interface IPurchasesBetweenDatesResponse {
    since:       Date;
    until:       Date;
    purchases:   IPurchase[];
    totalAmount: number;
}
