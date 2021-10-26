import { User } from ".prisma/client";

export interface Post {
    id: string,
    title: string,
    body: string,
    author?: User,
    author_id?: string,
    created_at?: number,
    updated_at?: number,
    deleted_at?: number
}