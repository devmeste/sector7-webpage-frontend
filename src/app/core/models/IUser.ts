export interface IUser {
    username: string;
    password: string;
    userData: UserData;
}

export interface UserData {
    firstname:       string;
    lastname:        string;
    email:           string;
    areaCode:        string;
    cellphoneNumber: string;
    photo:           [];
}
