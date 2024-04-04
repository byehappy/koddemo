export interface User {
    id: number;
    login: string;
    password: string;
    fio: string;
    phone_number: string;
    email: string;
    role: Role;
}
export enum Role {
    "user"="user","admin"="admin"
}
