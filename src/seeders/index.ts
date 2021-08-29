import * as userSeeder from './user.seeder';
import * as exampleSeeder from './example.seeder';

export const seedAll = async () => {

    await userSeeder.seed();
    await exampleSeeder.seed();

}
