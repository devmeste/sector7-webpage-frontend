
export interface ProductResponse {
    products:   BKProduct[];
    pagination: Pagination;
}

export interface Pagination {
    currentPage:   number;
    totalPages:    number;
    totalElements: number;
}

export interface BKProduct {
    id:           string;
    categoryId:   string;
    brand:        string;
    model:        string;
    price:        number;
    stock:        number;
    title:        string;
    description:  string;
    enabled:      boolean;
    creationDate: Date;
    photos:       any[];
    fieldsJSON:   string;
}
