import { NextFunction, Request, Response } from "express";
import { BaseModelInterface } from "../interfaces/model.interface";
import { User } from "../interfaces/user.interface";
import * as bcrypt from 'bcrypt';
import BaseController from "./base.controller";

export default class UserController extends BaseController<User> {

    constructor(private userModel: BaseModelInterface<User>) {
        super(userModel);
    }

    /**
     * @MOUD I'm overriding the create function to add password encryption 
     */
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            let data: User = req.body;
            let response = await this.userModel.create(data);
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
            const data: Partial<User> = req.body;
            // Using bcrypt to hash the user password
            if(data.password) data.password = await bcrypt.hash(data.password, 10);

            let response = await this.userModel.update({id: req.params.id}, data);
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
            const data: Partial<User> = req.body;
            // Using bcrypt to hash the user password
            if(data.password) data.password = await bcrypt.hash(data.password, 10);

            let response = await this.userModel.updateMany({id: req.params.id}, data);
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
            const data: Partial<User> = req.body;
            // Using bcrypt to hash the user password
            if(data.password) data.password = await bcrypt.hash(data.password, 10);

            let response = await this.userModel.upsert({id: req.params.id}, data);
            res.send({
                data: response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

}