import { IProduct_Cart_Add_Entry_Request } from "../IProduct_Cart_Add_Entry_Request";

export interface ISaveAll {
    cartLines: IProduct_Cart_Add_Entry_Request[];
    assembled: boolean;
    installed: boolean;
}