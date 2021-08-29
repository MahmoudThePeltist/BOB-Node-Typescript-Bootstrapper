import { NextFunction, Request, Response } from "express";
import { BaseControllerInterface } from "../interfaces/controller.interface";
import { BaseModelInterface } from "../interfaces/model.interface";

export default class BaseController<T> implements BaseControllerInterface<T> {

    constructor(private model: BaseModelInterface<T>) {}

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let response = await this.model.get();
            res.send({
                data: response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async getSpecific(req: Request, res: Response, next: NextFunction) {
        try {
            let response = await this.model.get({_id: req.params.id});
            res.send({
                data: response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data: Partial<T> = req.body;

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

            let response = await this.model.update({_id: req.params.id}, data);
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
            let response = await this.model.delete({_id: req.params.id});
            res.send({
                data: response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }


}