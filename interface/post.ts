export interface Post {
    id: number;
    user_id: number;
    number_auto: string;
    descr: string;
    status: Status
}

export enum Status {
    "новое"="новое", "подтверждено"="подтверждено", "отклонено"="отклонено"
}