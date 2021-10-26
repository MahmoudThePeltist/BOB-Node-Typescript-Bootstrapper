import * as userSeeder from './user.seeder';
import * as postSeeder from './post.seeder';

export const seedAll = async () => {

    await userSeeder.seed();
    await postSeeder.seed();

}
