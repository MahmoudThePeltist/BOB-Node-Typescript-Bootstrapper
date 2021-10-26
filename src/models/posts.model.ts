import { PrismaClient } from '@prisma/client';
import { Post } from '../interfaces/post.interface';
import BaseModel from './base.model';

export default class PostModel extends BaseModel<Post> {
    
    constructor() {
        let prisma: PrismaClient = new PrismaClient();

        let relationships = {
            'author': true
        }
        
        super(prisma.post, relationships);
    }

}