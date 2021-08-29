export interface User {
    _id: string,
    name: string,
    role: string,
    password: string,
    email: string,
    created_at?: number,
    updated_at?: number,
    deleted_at?: number
}