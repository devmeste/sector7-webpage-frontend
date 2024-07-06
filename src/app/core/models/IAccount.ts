export interface IAccount {
    id:       string;
    username: string;
    password: string;
    authorities?: string; 
    userData: UserData | null;
    enabled:  boolean;
}

export interface UserData {
    id:              string;
    firstname:       string;
    lastname:        string;
    email:           string;
    areaCode:        string;
    cellphoneNumber: string;
}


export interface IAccountReq {
    username: string;
    password: string;
    role:     string;
}