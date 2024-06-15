export default interface BKProduct {
    id:           string;
    categoryId:   string;
    brand:        string;
    model:        string;
    price:        number;
    stock:        number;
    title:        string;
    description:  string;
    isEnabled:      boolean;
    creationDate?: Date;
    photos?:       string[];
    fieldsJSON:   string;
}
