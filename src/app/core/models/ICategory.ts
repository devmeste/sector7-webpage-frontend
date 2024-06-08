import IField from "./Field";


export default interface ICategory{
        id: string,
        name: string,
        component: boolean,
        fields: IField[],
}