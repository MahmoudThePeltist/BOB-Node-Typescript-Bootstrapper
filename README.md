# Node Bootstrapper One Billion (NBOB)
Another NodeJS project bootstrapper for CRUD heavy RESTAPI Projects. With
 * Built in JWT auth.
 * Optional 2FA authentication for pairing with apps such as Google Authenticator.
 * Automatic DB seeding.
 * CRON job handling.
## Usage
Eventually there may be a CLI tool to allow you to customize the experience provided by NBOB, but for now the best way to use it is to either clone the project or fork it and read through the examples.

``` git clone https://github.com/MahmoudThePeltist/BOB-Node-Typescript-Bootstrapper.git ```
## Directory Structure
```
 * /src/interfaces  - Typescript interfaces for controllers, models and entities.
 * /src/schemas     - Mongoose schemas for MongoDB.
 * /src/models      - Model definition and methods for Mongoose.
 * /src/seeders     - Seed files and factories to populate the database on project launch.
 * /src/routers     - Route files to define the project RESTful endpoints. 
 * /src/controllers - MVC Controllers to contain the project business logic.
 * /src/cron        - A centralized CRON directory for all CRON operations.
```
## Packages of note
 * [Express:](expressjs.com) "A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications."
 * [Mongoose:](https://mongoosejs.com/) The project is specifically designed to work with Mongoose, this is a consious decision to streamline development.
 * [Qufl:](https://github.com/Mahamed-Belkheir/qufl) A Great JWT auth library that supports refresh tokens.
 
 ## Other Packages
 * `bcrypt`: Used for password encryption as part of user auth.
 * `cors`: Cross Origin Request error handling.
 * `dotenv`: Environmental variable handling.
 * `node-cron`: CRON library to perform CRON operations.
 * `otplib`: An OTP generator library.
 * `qrcode`: A QR Code generator library.

 ### CREDITS

 inspired by [Haykal](https://github.com/Mahamed-Belkheir/haykal) and [Laravel](https://laravel.com/)!