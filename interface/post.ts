export interface Post {
    id: number;
    user_id: number;
    number_auto: string;
    descr: string;
    status: Status
}

enum Status {
    "новое", "подтверждено", "отклонено"
}