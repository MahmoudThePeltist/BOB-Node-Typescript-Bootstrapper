import { BaseModelInterface } from "../interfaces/model.interface";
import BaseController from "./base.controller";
import { Post } from "../interfaces/post.interface";

export default class PostController extends BaseController<Post> {

    constructor(private entityModel: BaseModelInterface<Post>) {
        super(entityModel);
    }
    
}