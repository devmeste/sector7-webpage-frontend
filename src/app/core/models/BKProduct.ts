export default interface BKProduct {
    id:           string;
    categoryId:   string;
    brand:        string;
    model:        string;
    price:        number;
    actualStock:    number;
    viewStock:    number;
    title:        string;
    description:  string;
    isEnabled:      boolean;
    isApproved: boolean;
    creationDate?: Date;
    photos?:       string[];
    fieldsJSON:   string;
}
