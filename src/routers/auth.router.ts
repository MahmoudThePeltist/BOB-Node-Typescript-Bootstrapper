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

export default AuthRouter;