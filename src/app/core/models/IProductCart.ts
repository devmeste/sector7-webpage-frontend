import { IProduct_Cart_Entry_BK } from "./IProduct_Cart_Entry_BK";

export interface IProductCart {
    cartLines: IProduct_Cart_Entry_BK[];
    assembled: ServiceAddedToCart;
    installed: ServiceAddedToCart;
}

export interface ServiceAddedToCart {
    amount: number;
    title : string;
}

// export interface CartLine {
//     id:        string;
//     productId: string;
//     quantity:  number;
//     title:     string;
//     photoUrl:  string;
//     stock:     number;
//     price:     number;
// }
