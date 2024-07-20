import { IPurchaseProduct } from "./IPurchaseProduct";

// This Purchase comes from the server, 
// but is not the purchase that the user can make
// See MakePurchase to see the purchase that the user can make

export interface IPurchase {
    id: string;
    fullname:      string;
    products:      IPurchaseProduct[];
    totalAmount:   number;
    shipment:      IShipment | null;
    merchantOrder: string | null;
    paymentStatus: string | null;
    purchaseDate: Date;
}

export interface IShipment {
    id:        string;
    address:   Address;
    status:    string;
    trackId:   string;
    expeditor: string;
}

export interface Address {
    id ?:           string;
    zipCode:      number;
    province:     string;
    city:         string;
    streetName:   string;
    streetNumber: number;
    floor:        number;
    door:         string;
}

