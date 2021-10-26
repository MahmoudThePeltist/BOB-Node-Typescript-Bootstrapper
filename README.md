# Node Bootstrapper One Billion (NBOB)
Another NodeJS project bootstrapper for CRUD heavy RESTAPI Projects. Features:
 * Built in JWT authentication and the relevent endpoints.
 * Optional 2FA authentication (for apps such as Google Authenticator)
 * Optional Automatic DB seeding on launch.
 * CRON job handling.
 * Robust query builder with pagination.

## Directory Structure
```
 * /src/interfaces  - Typescript interfaces for controllers, models and entities.
 * /src/models      - Model definition and methods that wrap over Prisma or your ORM.
 * /src/seeders     - Seed files and factories to populate the database on project launch.
 * /src/routers     - Route files to define the project RESTful endpoints. 
 * /src/controllers - MVC Controllers to contain the project business logic.
 * /src/cron        - A centralized CRON directory for all CRON operations.
 * /src/middleware  - Expressjs middleware, currently has security and ratelimiting.
 * /src/utils       - Utilities and helper functions, currently has file upload and a query builder.
```

 ## Usage Guide
Eventually there may be a CLI tool to allow you to customize the experience provided by NBOB, but for now the best way to use it is to either clone the project or fork it and read through the **User** and **Post** example and follow the steps below.

``` git clone variant-sql https://github.com/MahmoudThePeltist/BOB-Node-Typescript-Bootstrapper.git ```
 ### A - Define your database schema
 1. Confirm that your `.env` file exists, if not, copy and rename the `example.env` file, then populate it with your DB info
 2. Define your MongoDB schemas in the `src\schemas` directory

### B - Create application layer
 1. Create a **model** in `src\models\` that extends the `src\models\base.model.ts` for each table in your schema
 2. Create a **controller** in `src\controllers\` that extends the `src\controllers\base.controller.ts` for each model in your models directory
 3. Create a **routing file** in `src\routers\` and define your base routes, then export the file in your `src\routers\index.ts` 

### C - Additional Features
 1. CRON jobs can be configured functionally in the `src\cron` directory, make sure to import each new file in `src\cron\index.ts`
 2. Seeders can be placed in the `src\seeders` directory, make sure to import and call each seed function in `src\seeders\index.ts`
 3. New middleware can be defined in the `src\middleware` directory
 4. Any other services or functionality that doens't fit the previously defined directories can be placed in the `src\utils` directory

## Utilized Packages
### Essential packages
 * [Express:](expressjs.com) "A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications."
 * [Mongoose:](https://mongoosejs.com/) The project is specifically designed to work with Mongoose, this is a consious decision to streamline development.
 * [Qufl:](https://github.com/Mahamed-Belkheir/qufl) A Great JWT auth library that supports refresh tokens.
 
 ### Other packages
 * `bcrypt`: Used for password encryption as part of user auth.
 * `cors`: Cross Origin Request error handling.
 * `dotenv`: Environmental variable handling.
 * `node-cron`: CRON library to perform CRON operations.
 * `otplib`: An OTP generator library.
 * `qrcode`: A QR Code generator library.
 * `express-rate-limit`: Rate limiting library for security. 

 ### CREDITS

 Made by Moud, inspired by [Haykal](https://github.com/Mahamed-Belkheir/haykal) and [Laravel](https://laravel.com/)!