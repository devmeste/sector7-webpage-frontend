export interface IProductRequest {
    id?:              string;
    categoryId:      string;
    brand:           string;
    model:           string;
    price:           number;
    actualStock:     number;
    viewStock:       number;
    title:           string;
    description:     string;
    isEnabled:       boolean;
    isApproved?:      boolean;
    fieldsJSON:      string;
    photosByteArray: Array<number[]>;
}
