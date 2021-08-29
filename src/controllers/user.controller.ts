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
            let userObject: User = req.body;
            // Using bcrypt to hash the user password
            userObject.password = await bcrypt.hash(userObject.password, 10);
            let response = await this.userModel.create(userObject);
            res.send({
                data: response,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

}