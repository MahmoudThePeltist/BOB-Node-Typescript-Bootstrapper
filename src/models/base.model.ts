import { Model, model, Schema } from 'mongoose';
import { BaseModelInterface } from '../interfaces/model.interface';

export default class BaseModel<T> implements BaseModelInterface<T> {

    protected entityModel: Model<T>;
    protected relationships: string[];
    
    constructor(tablename: string, schema: Schema<T>, relationships: string[] = []) {
        this.entityModel = model<T>(tablename, schema);
        this.relationships = relationships;
    }

    /**
     * Get all items with their count, or paginate them.
     * @param data 
     * @returns 
     */
    public async get(query: any = {}, page?: number, pageSize: number = 10) {
        try {
            if(page == 0 || page){
                let data = await this.entityModel.find(query)
                    .limit(pageSize)
                    .skip(page*pageSize)
                    .populate(this.relationships);
                
                return {data, page, pageSize, total: await this.count(query)};
            }
            else {
                let data = await this.entityModel.find(query)
                    .populate(this.relationships);

                return {data, total: await this.count(query)};
            }
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

    /**
     * Delete takes a single item or an array of items
     * @param data 
     * @returns 
     */
    public async delete(data: any | any[]) {
        try {
            if(Array.isArray(data))
                return await this.entityModel.deleteMany({_id: {$in: data}});
            else
                return await this.entityModel.deleteOne({_id: data});
        } catch(e) {
            throw(e);
        }
    }

    public async count(query: any) {
        try {
            return await this.entityModel.countDocuments(query);
        } catch(e) {
            throw(e);
        }
    }

}