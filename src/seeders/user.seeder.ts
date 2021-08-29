import { BaseModelInterface } from "../interfaces/model.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import * as bcrypt from 'bcrypt';

let model: BaseModelInterface<User> = new UserModel();

export const factory = async (data: any): Promise<Partial<User>> => {
    const password: string = await bcrypt.hash(data.password, 10);

    return {
        _id: data._id ?? null,
        name: data.name ?? null,
        role: data.role ?? null,
        password: password ?? null,
        email: data.email ?? null
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
    } catch(e) {
        console.log("🌱 users - Seed warning: ", e.message);
    }
} 