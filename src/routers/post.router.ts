import { Router } from "express";
import Qufl from "qufl";
import PostController from "../controllers/post.controller";
import { BaseModelInterface } from "../interfaces/model.interface";
import { Post } from "../interfaces/post.interface";
import PostModel from "../models/posts.model";

const PostRouter = Router()

let model: BaseModelInterface<Post> = new PostModel();
let qufl = new Qufl({ secret: process.env.JWT_SECRET });
let controller = new PostController(model);

PostRouter.get('/', qufl.auth(), (req, res, next) => controller.getAll(req, res, next));
PostRouter.get('/count', qufl.auth(), (req, res, next) => controller.count(req, res, next));
PostRouter.get('/:id', qufl.auth(), (req, res, next) => controller.getSpecific(req, res, next));
PostRouter.post('/', qufl.auth(), (req, res, next) => controller.create(req, res, next));
PostRouter.patch('/:id', qufl.auth(), (req, res, next) => controller.update(req, res, next));
PostRouter.patch('/', qufl.auth(), (req, res, next) => controller.updateMany(req, res, next));
PostRouter.delete('/:id', qufl.auth(), (req, res, next) => controller.delete(req, res, next));
PostRouter.delete('/', qufl.auth(), (req, res, next) => controller.deleteMany(req, res, next));

export default PostRouter;