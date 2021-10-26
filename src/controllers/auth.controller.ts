import { NextFunction, Request, Response } from "express";
import Qufl from "qufl";
import { AuthCredentials } from "../interfaces/credentials.interface";
import { BaseModelInterface, GetResponse } from "../interfaces/model.interface";
import { User } from "../interfaces/user.interface";
import * as bcrypt from 'bcrypt';
import qrcode from 'qrcode';
import { authenticator } from '@otplib/preset-default';
export default class AuthController {

    constructor(private userModel: BaseModelInterface<User>, private qufl: Qufl) {}

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: AuthCredentials = req.body;

            const matchingUsers: GetResponse<User> = await this.userModel.get({email: email});  
            let data: User = Array.isArray(matchingUsers.data) ? matchingUsers.data[0] : matchingUsers.data;

            console.log("Matching users or something: ", matchingUsers);

            if(!data) throw({code:404, message: "Authentication: User not found."});

            const result = await bcrypt.compare(password, data.password);
            if(!result) throw({code:403, message: "Authentication: Incorrect password."});

            // If Multi-factor Authentication is enabled, send a request to send an OTP
            if(data.MFA_enabled) {
                res.send({
                    multiFactorAuthentication: true,
                    success: true
                })

                return;
            }

            const { token, refresh } = await this.qufl.signToken({
                sub: data.id,
                aud: data.role,
                payload: {
                    data: matchingUsers
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

    async enable2FA(req: Request, res: Response, next: NextFunction) {
        try {
            const usersFound: GetResponse<User> = await this.userModel.get({id: req.qufl.sub});
            if(!usersFound.data) throw({code:404, message: "Authentication: User not found."});

            let user: User = Array.isArray(usersFound.data) ? usersFound.data[0] : usersFound.data;
            user.MFA_secret = authenticator.generateSecret();
            user.MFA_enabled = false;

            let updateResult = await this.userModel.update({id: user.id}, user);

            const otp = authenticator.keyuri(user.name, "Ventura", user.MFA_secret);
            let image: string = await qrcode.toDataURL(otp);

            res.send({
                qrCode: image,
                result: updateResult,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async confirm2FA(req: Request, res: Response, next: NextFunction) {
        try {
            const { otpToken }: AuthCredentials = req.body;
            if(!otpToken) throw({code:422, message: "Authentication: OTP token not found."});

            const matchingUsers: GetResponse<User> = await this.userModel.get({id: req.qufl.sub});
            let user: User = Array.isArray(matchingUsers.data) ? matchingUsers.data[0] : matchingUsers.data;

            const otpIsValid: boolean = authenticator.check(otpToken ?? '', user.MFA_secret);
            if(!otpIsValid) throw({code:422, message: "Authentication: OTP token is not valid."});

            user.MFA_enabled = true;

            let updateResult = await this.userModel.update({id: user.id}, user);
            
            res.send({
                result: updateResult,
                success: true
            })

        } catch(e) {
            next(e);
        }
    }

    async disable2FA(req: Request, res: Response, next: NextFunction) {
        try {
            const usersFound: GetResponse<User> = await this.userModel.get({id: req.qufl.sub});
            if(!usersFound.data) throw({code:404, message: "Authentication: User not found."});

            let user: User = Array.isArray(usersFound.data) ? usersFound.data[0] : usersFound.data;;
            user.MFA_secret = '';
            user.MFA_enabled = false;

            let updateResult = await this.userModel.update({id: user.id}, user);

            res.send({
                result: updateResult,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async activeUser(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("Qufl sub: ", req.qufl.sub);
            const usersFound: GetResponse<User> = await this.userModel.get({id: req.qufl.sub});
            if(!usersFound.data) throw({code:404, message: "Authentication: User not found."});

            res.send({
                result: usersFound.data,
                success: true
            })
        } catch(e) {
            next(e);
        }
    }

    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, otpToken }: AuthCredentials = req.body;
            if(!otpToken) throw({code:422, message:"Authentication: OTP token not found."});

            const matchingUsers: GetResponse<User> = await this.userModel.get({email: email});
            
            if(!matchingUsers.data) throw({code:404, message:"Authentication: User not found."});
            let user: User = Array.isArray(matchingUsers.data) ? matchingUsers.data[0] : matchingUsers.data;

            const result = await bcrypt.compare(password, user.password);
            if(!result) throw({code:403, message:"Authentication: Incorrect password."});

            const otpIsValid: boolean = authenticator.check(otpToken??'', user.MFA_secret);
            if(!otpIsValid) throw({code:422, message:"Authentication: OTP token is not valid."});

            const { token, refresh } = await this.qufl.signToken({
                sub: user.id,
                aud: user.role,
                payload: {
                    data: user
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