import { User } from "../interfaces/user.interface";
import { Post } from "../interfaces/post.interface";
import { BaseModelInterface } from "../interfaces/model.interface";
import PostModel from "../models/posts.model";
import UserModel from "../models/user.model";
import { isArray } from "util";

let model: BaseModelInterface<Post> = new PostModel();
let usersModel: BaseModelInterface<User> = new UserModel();

export const factory = async (data: any): Promise<Partial<Post>> => {
    return {
        id: data.id ?? undefined,
        title: data.title ?? undefined,
        body: data.body ?? undefined,
        author_id: data.author_id ?? 1
    }
}

export const seed = async () => {
    let { data: user } = await usersModel.get({email: 'employee@test.com'});

    try {
        await model.create([
            await factory({
                id: 'a79174ff-2c93-472c-b535-2110eefbc138',
                title: 'Post Title',
                body: 'Body of example post that is generated in seeder.',
                author_id: Array.isArray(user) ? user[0].id : user.id
            }),
        ])
    } catch(e: any) {
        console.log("🌱 Post - Seed warning: ", e.message);
    }
} 