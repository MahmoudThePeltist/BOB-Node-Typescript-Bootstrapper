import mongoose from 'mongoose';
import { BaseModelInterface } from "../interfaces/model.interface";
import { Example } from "../interfaces/example.interface";
import ExampleModel from "../models/example.model";

let model: BaseModelInterface<Example> = new ExampleModel();

export const factory = async (data: any): Promise<Partial<Example>> => {
    return {
        _id: data._id ?? null,
        name: data.name ?? null
    }
}

export const seed = async () => {
    try {
        await model.create([
            await factory({
                _id: mongoose.Types.ObjectId('612a4bb57f704be0306010c1'),   
                name: 'name',
            }),
        ])
    } catch(e: any) {
        console.log("🌱 subcategories - Seed warning: ", e.message);
    }
} 