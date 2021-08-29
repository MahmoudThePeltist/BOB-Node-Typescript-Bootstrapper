import { BaseModelInterface } from "../interfaces/model.interface";
import BaseController from "./base.controller";
import { Example } from "../interfaces/example.interface";

export default class ExampleController extends BaseController<Example> {

    constructor(private entityModel: BaseModelInterface<Example>) {
        super(entityModel);
    }
    
}