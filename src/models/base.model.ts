import { Prisma, PrismaClient } from '@prisma/client';
import { BaseModelInterface } from '../interfaces/model.interface';

export default class BaseModel<T> implements BaseModelInterface<T> {

    protected model: any;

    protected relationships: {[relationship: string]: boolean};
    
    constructor(model: any, relationships: {[relationship: string]: boolean} = {}) {
        this.relationships = relationships;
        this.model = model;
    }

    /**
     * Get all items with their count, or paginate them.
     * @param data
     */
    public async get(query: any = {}, page?: number, pageSize: number = 10) {
        let include: any = this.relationships ? this.relationships : undefined;

        try {
            if(page == 0 || page) {
                let data = await this.model.findMany({
                    take: pageSize,
                    skip: page * pageSize,
                    where: query,
                    include,
                    orderBy: {
                        created_at: 'desc'
                    }
                });
                return {data, page, pageSize, total: await this.count(query)};
            }
            else
            {
                let data = await this.model.findUnique({
                    where: query,
                    include
                });
                return {data, total: await this.count(query)};
            }
        } catch(e) {
            throw(e);
        }
    }

    /**
     * Create takes a single item or an array of items for creating one or many
     * @param data
     */
    public async create(data: any | any[]) {
        try {
            if(Array.isArray(data))
                return await this.model.createMany({data});
            else
                return await this.model.create({data});
        } catch(e) {
            throw(e);
        }
    }

    public async update(query: any, data: Partial<T>) {
        try {
            return await this.model.update({where: query, data});
        } catch(e) {
            throw(e);
        }
    }

    public async updateMany(query: any, data: Partial<T>) {
        try {
            return await this.model.updateMany({where: query, data});
        } catch(e) {
            throw(e);
        }
    }

    public async upsert(query: any, data: Partial<T>) {
        try {
            return await this.model.upsert({where: query, update: data, create: data});
        } catch(e) {
            throw(e);
        }
    }

    /**
     * Delete takes a single item or an array of items for deleting one or many
     * @param data
     */
    public async delete(data: any | any[]) {
        try {
            if(Array.isArray(data))
                return await this.model.deleteMany({where: {id: {in: data}}});
            else
                return await this.model.delete({where: {id: data}});
        } catch(e) {
            throw(e);
        }
    }

    public async count(query: any) {
        try {
            return await this.model.count({where: query});
        } catch(e) {
            throw(e);
        }
    }

}