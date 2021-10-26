export interface User {
    id: string,
    name: string,
    role: string,
    password: string,
    MFA_secret: string,
    MFA_enabled: boolean,
    email: string,
    created_at?: number,
    updated_at?: number,
    deleted_at?: number
}