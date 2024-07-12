import { IPurchase } from "./IPurchase";

export interface IBillsBetweenDates {
    since:       Date;
    until:       Date;
    purchases:   IPurchase[];
    totalAmount: number;
}



