import { Schema } from 'mongoose';
import { User } from '../interfaces/user.interface';

export const UserSchema = new Schema<User>({
    name:
        { type: String, required: true },
    role:
        { type: String, default: "admin", required: true },
    password:
        { type: String, required: true },
    email:
        { type: String, required: true, unique: true },
    created_at: 
        { type: Number, default: new Date().getTime() },
    updated_at: 
        { type: Number, default: null },
    deleted_at: 
        { type: Number, default: null },
})