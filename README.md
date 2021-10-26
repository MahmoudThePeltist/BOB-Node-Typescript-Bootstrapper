# Node Bootstrapper One Billion (NBOB)
NodeJs based Typescript bootstrapper for CRUD heavy Restful API projects, based on the MVC pattern. Now in two flavors, Mongoose and Prisma for your choice of Database. 

 * Built in JWT authentication and basic users management CRUD with all the relevent endpoints.
 * Optional 2FA authentication (for apps such as Google Authenticator) built into users CRUD.
 * Built in loose coupling with either Mongoose, or Prisma, can easily be replaced with other alternatives.
 * Optional Automatic DB seeding on launch.
 * Optional CRON job handling.
 * Built in query builder with pagination for MongoDB.

## Usage
Eventually there may be a CLI tool to allow you to customize the experience provided by NBOB, but for now the best way to use it is

1. Checkout the variant branch that fits your needs.
2. Read through the `Readme.md` usage guide. 
3. Either clone the project or fork it.

### Variants

1. NoSQL Variant, loosely coupled to MongoDB via Mongoose at the Model Layer, on branch `variant-nosql` can be cloned using
    ``` git clone -b variant-nosql https://github.com/MahmoudThePeltist/BOB-Node-Typescript-Bootstrapper.git ```

1. SQL/noSQL Variant, loosely coupled to Prisma and can be used with any database at the Model Layer, on branch `variant-sql` can be cloned using
    ``` git clone -b variant-sql https://github.com/MahmoudThePeltist/BOB-Node-Typescript-Bootstrapper.git ```
 ### CREDITS

 inspired by [Haykal](https://github.com/Mahamed-Belkheir/haykal) and [Laravel](https://laravel.com/)!