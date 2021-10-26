import { NextFunction, Request, Response } from "express";
import { BaseControllerInterface } from "../interfaces/controller.interface";
import { BaseModelInterface } from "../interfaces/model.interface";
import { FilterObject, filterQueryBuilder } from "../utilities/search.utils";

export default class BaseController<T> implements BaseControllerInterface<T> {

    protected options: {
        filters?: FilterObject[],
        andMode?: boolean,
        searchAllAttribute?: string
    } = {}

    constructor(private model: BaseModelInterface<T>) {}

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const page: any = req?.query?.page ? Number(req?.query?.page) : undefined;
            const pageSize: any = req?.query?.pageSize ? Number(req?.query?.pageSize) : 10;
            
            let response = await this.model.get({}, page, pageSize);
            res.send({
                ...response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async getSpecific(req: Request, res: Response, next: NextFunction) {
        try {
            let response = await this.model.get({id: req.params.id});
            res.send({
                ...response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            // Create one or many
            const data: Partial<T> | Partial<T>[] = req.body;

            let response = await this.model.create(data);
            res.send({
                data: response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data: Partial<T> = req.body;

            let response = await this.model.update({id: req.params.id}, data);
            res.send({
                data: response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async updateMany(req: Request, res: Response, next: NextFunction) {
        try {
            const data: Partial<T> = req.body;

            let response = await this.model.updateMany({id: req.params.id}, data);
            res.send({
                data: response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async upsert(req: Request, res: Response, next: NextFunction) {
        try {
            const data: Partial<T> = req.body;

            let response = await this.model.upsert({id: req.params.id}, data);
            res.send({
                data: response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            let response = await this.model.delete(req.params.id);
            res.send({
                data: response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async deleteMany(req: Request, res: Response, next: NextFunction) {
        try {
            let response = await this.model.delete(req.body.data);
            res.send({
                data: response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async count(req: Request, res: Response, next: NextFunction) {
        try {
            let response = await this.model.count({});
            res.send({
                data: response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }


}