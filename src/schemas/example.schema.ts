import { Schema } from 'mongoose';
import { Example } from '../interfaces/example.interface';

export const ExampleSchema = new Schema<Example>({
    name:
        { type: String, required: true },
    created_at: 
        { type: Number, default: new Date().getTime() },
    updated_at: 
        { type: Number, default: null },
    deleted_at: 
        { type: Number, default: null },
})