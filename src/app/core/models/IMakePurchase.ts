export interface IMakePurchase {
    products:    Product_QuantityRequested[];
    address:     Address | null; // just if localPickUp is false
    localPickUp: boolean;
}

export interface Address {
    zipCode:      number;
    province:     string;
    city:         string;
    streetName:   string;
    streetNumber: string;
    floor:        string;
    door:         string;
}


export interface Product_QuantityRequested {
    [key: string]: number; // dinamic key value
}