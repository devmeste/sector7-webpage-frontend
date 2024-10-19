export interface IFiltersForSearch {

    price :{
      since: number | null;
      until: number | null;
    },
    category : string | null,
    brand : string | null
  }
  
  