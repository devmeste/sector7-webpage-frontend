import IField from "./Field";


export interface ICategory{
        id: string,
        name: string,
        component?: boolean,
        fields: IField[],
}

export interface BKICategory{
    id: string,
    name: string,
    component?: boolean,
    fields: string[],
}