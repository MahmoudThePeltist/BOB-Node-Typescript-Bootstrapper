# Node Bootstrapper One Billion (NBOB)
Another NodeJS project bootstrapper for CRUD heavy RESTAPI Projects.

## Directory Structure
```
 * /src/interfaces  - Typescript interfaces for controllers, models and entities.
 * /src/schemas     - Mongoose schemas for MongoDB.
 * /src/models      - Model definition and methods for Mongoose.
 * /src/seeders     - Seed files and factories to populate the database on project launch.
 * /src/routers     - Route files to define the project RESTful endpoints. 
 * /src/controllers - MVC Controllers to contain the project business logic.
```
## Packages of note
 * [Express:](expressjs.com) "A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications."
 * [Mongoose:](https://mongoosejs.com/) The project is specifically designed to work with Mongoose, this is a consious decision to streamline development.
 * [Qufl:](https://github.com/Mahamed-Belkheir/qufl) A Great JWT auth library that supports refresh tokens.
 
 ## Other Packages
 * Bcrypt: Used for password encryption as part of user auth.
 * Cors: Cross Origin Request error handling.
 * Dotenv: Environmental variable handling.

 ### CREDITS

 inspired by [Haykal](https://github.com/Mahamed-Belkheir/haykal) and [Laravel](https://laravel.com/)!