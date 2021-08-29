import { Model, model, Schema } from 'mongoose';
import { BaseModelInterface } from '../interfaces/model.interface';

export default class BaseModel<T> implements BaseModelInterface<T> {

    protected entityModel: Model<T>;
    protected relationships: string[];
    
    constructor(tablename: string, schema: Schema<T>, relationships: string[] = []) {
        this.entityModel = model<T>(tablename, schema);
        this.relationships = relationships;
    }

    public async get(query: any = {}) {
        try {
            return await this.entityModel.find(query)
                .populate(this.relationships);
        } catch(e) {
            throw(e);
        }
    }

    public async create(data: T | T[]) {
        try {
            return await this.entityModel.create(data);
        } catch(e) {
            throw(e);
        }
    }

    public async update(query: any, data: T) {
        try {
            return await this.entityModel.updateOne(query, data);
        } catch(e) {
            throw(e);
        }
    }

    public async delete(query: any) {
        try {
            return await this.entityModel.deleteOne(query);
        } catch(e) {
            throw(e);
        }
    }

}