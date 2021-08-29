import { User } from '../interfaces/user.interface';
import { UserSchema } from "../schemas/user.schema";
import BaseModel from './base.model';

export default class UserModel extends BaseModel<User> {
    
    constructor() {
        super('users', UserSchema, []);
    }

}