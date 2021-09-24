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

            if(!matchingUsers.data[0]) throw({code:404, message: "Authentication: User not found."});

            const result = await bcrypt.compare(password, matchingUsers.data[0].password);
            if(!result) throw({code:403, message: "Authentication: Incorrect password."});

            // If Multi-factor Authentication is enabled, send a request to send an OTP
            if(matchingUsers.data[0].MFA_enabled) {
                res.send({
                    multiFactorAuthentication: true,
                    success: true
                })

                return;
            }

            const { token, refresh } = await this.qufl.signToken({
                sub: matchingUsers.data[0]._id,
                aud: matchingUsers.data[0].role,
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
            const usersFound: GetResponse<User> = await this.userModel.get({_id: req.qufl.sub});
            if(!usersFound.data[0]) throw({code:404, message: "Authentication: User not found."});

            let user: User = usersFound.data[0];
            user.MFA_secret = authenticator.generateSecret();
            user.MFA_enabled = false;

            let updateResult = await this.userModel.update({_id: user._id}, user);

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

            const matchingUsers: GetResponse<User> = await this.userModel.get({_id: req.qufl.sub});
            let user: User = matchingUsers.data[0];

            const otpIsValid: boolean = authenticator.check(otpToken ?? '', matchingUsers.data[0].MFA_secret);
            if(!otpIsValid) throw({code:422, message: "Authentication: OTP token is not valid."});

            user.MFA_enabled = true;

            let updateResult = await this.userModel.update({_id: user._id}, user);
            
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
            const usersFound: GetResponse<User> = await this.userModel.get({_id: req.qufl.sub});
            if(!usersFound.data[0]) throw({code:404, message: "Authentication: User not found."});

            let user: User = usersFound.data[0];
            user.MFA_secret = '';
            user.MFA_enabled = false;

            let updateResult = await this.userModel.update({_id: user._id}, user);

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
            const usersFound: GetResponse<User> = await this.userModel.get({_id: req.qufl.sub});
            if(!usersFound.data[0]) throw({code:404, message: "Authentication: User not found."});

            res.send({
                result: usersFound.data[0],
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
            if(!matchingUsers.data[0]) throw({code:404, message:"Authentication: User not found."});

            const result = await bcrypt.compare(password, matchingUsers.data[0].password);
            if(!result) throw({code:403, message:"Authentication: Incorrect password."});

            const otpIsValid: boolean = authenticator.check(otpToken??'', matchingUsers.data[0].MFA_secret);
            if(!otpIsValid) throw({code:422, message:"Authentication: OTP token is not valid."});

            const { token, refresh } = await this.qufl.signToken({
                sub: matchingUsers.data[0]._id,
                aud: matchingUsers.data[0].role,
                payload: {
                    data: matchingUsers.data
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