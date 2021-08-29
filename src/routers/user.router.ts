import { Router } from "express";
import Qufl from "qufl";
import UserController from "../controllers/user.controller";
import { BaseModelInterface } from "../interfaces/model.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user.model";

const UserRouter = Router()

let model: BaseModelInterface<User> = new UserModel();
let qufl = new Qufl({ secret: process.env.JWT_SECRET });
let controller = new UserController(model);

UserRouter.get('/', qufl.auth(), (req, res, next) => controller.getAll(req, res, next));
UserRouter.get('/:id', qufl.auth(), (req, res, next) => controller.getSpecific(req, res, next));
UserRouter.post('/', qufl.auth(), (req, res, next) => controller.create(req, res, next));
UserRouter.patch('/:id', qufl.auth(), (req, res, next) => controller.update(req, res, next));
UserRouter.delete('/:id', qufl.auth(), (req, res, next) => controller.delete(req, res, next));

export default UserRouter;