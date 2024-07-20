export interface IMakePurchase {
    products:    IMakePurchaseProducts[];
    address:     Address;
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


export interface IMakePurchaseProducts {
    [key: string]: number; // dinamic key value
}