export interface IProduct{
    id: string;
    name: string;
    description: string;
    imgs: string[];
    price: number;
    stock: number;
    quantityRequested?: number;
}