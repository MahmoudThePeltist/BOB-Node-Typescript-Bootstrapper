import { Router } from "express";
import Qufl from "qufl";
import AuthController from "../controllers/auth.controller";
import { BaseModelInterface } from "../interfaces/model.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user.model";

const AuthRouter = Router();

let model: BaseModelInterface<User> = new UserModel();
let qufl = new Qufl({ secret: process.env.JWT_SECRET });
let controller = new AuthController(model, qufl);

AuthRouter.post('/login', (req, res, next) => controller.login(req, res, next));
AuthRouter.post('/login/validate', (req, res, next) => controller.validate(req, res, next));

AuthRouter.get('/me', qufl.auth(), (req, res, next) => controller.activeUser(req, res, next));
AuthRouter.post('/2fa/enable', qufl.auth(), (req, res, next) => controller.enable2FA(req, res, next));
AuthRouter.post('/2fa/confirm', qufl.auth(), (req, res, next) => controller.confirm2FA(req, res, next));
AuthRouter.post('/2fa/disable', qufl.auth(), (req, res, next) => controller.disable2FA(req, res, next));

export default AuthRouter;