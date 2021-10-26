import { BaseModelInterface } from "../interfaces/model.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import * as bcrypt from 'bcrypt';

let model: BaseModelInterface<User> = new UserModel();

export const factory = async (data: any): Promise<Partial<User>> => {
    const password: string = await bcrypt.hash(data.password, 10);

    return {
        id: data.id ?? undefined,
        name: data.name ?? undefined,
        role: data.role ?? undefined,
        password: password ?? undefined,
        email: data.email ?? undefined
    }
}

export const seed = async () => {
    try {
        await model.create([
            await factory({
                name: 'Admin',
                role: 'admin',
                email: 'admin@test.com',
                password: 'password',
            }),
            await factory({
                name: 'Employee',
                role: 'employee',
                email: 'employee@test.com',
                password: 'password',
            }),
        ])
    } catch(e: any) {
        console.log("🌱 Users - Seed warning: ", e.message);
    }
} 