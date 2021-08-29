import { Router } from "express";
import Qufl from "qufl";
import ExampleController from "../controllers/example.controller";
import { BaseModelInterface } from "../interfaces/model.interface";
import { Example } from "../interfaces/example.interface";
import ExampleModel from "../models/example.model";

const ExampleRouter = Router()

let model: BaseModelInterface<Example> = new ExampleModel();
let qufl = new Qufl({ secret: process.env.JWT_SECRET });
let controller = new ExampleController(model);

ExampleRouter.get('/', qufl.auth(), (req, res, next) => controller.getAll(req, res, next));
ExampleRouter.get('/:id', qufl.auth(), (req, res, next) => controller.getSpecific(req, res, next));
ExampleRouter.post('/', qufl.auth(), (req, res, next) => controller.create(req, res, next));
ExampleRouter.patch('/:id', qufl.auth(), (req, res, next) => controller.update(req, res, next));
ExampleRouter.delete('/:id', qufl.auth(), (req, res, next) => controller.delete(req, res, next));

export default ExampleRouter;