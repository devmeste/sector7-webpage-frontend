import BKProduct  from "./BKProduct";

export interface ProductResponse {
    products:   BKProduct[];
    pagination: Pagination;
}

export interface Pagination {
    currentPage:   number;
    totalPages:    number;
    totalElements: number;
}

