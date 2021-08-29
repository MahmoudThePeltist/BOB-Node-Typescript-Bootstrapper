import { NextFunction, Request, Response } from "express";
import Qufl from "qufl";
import { AuthCredentials } from "../interfaces/credentials.interface";
import { BaseModelInterface } from "../interfaces/model.interface";
import { User } from "../interfaces/user.interface";
import * as bcrypt from 'bcrypt';

export default class AuthController {

    constructor(private userModel: BaseModelInterface<User>, private qufl: Qufl) {}

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            let { email, password }: AuthCredentials = req.body;

            let response: User[] = await this.userModel.get({email: email});
            
            if(!response[0]) throw("Authentication: User not found.");

            let result = await bcrypt.compare(password, response[0].password);

            if(!result) throw("Authentication: Incorrect password.");

            let { token, refresh } = await this.qufl.signToken({
                sub: response[0]._id,
                aud: response[0].role,
                payload: {
                    data: response
                }
            })

            res.send({
                token,
                refresh,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

}