import { Example } from '../interfaces/example.interface';
import { ExampleSchema } from "../schemas/example.schema";
import BaseModel from './base.model';

export default class ExampleModel extends BaseModel<Example> {
    
    constructor() {
        super('examples', ExampleSchema, ['relationship', 'relationship', 'relationship']);
    }

}