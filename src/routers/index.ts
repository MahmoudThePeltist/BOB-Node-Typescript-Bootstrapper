import { Router } from "express";
import AuthRouter from "./auth.router";
import UserRouter from "./user.router";
import ExampleRouter from "./example.router";

// This is where we bind all the routes in the app to the same router
const AppRouter = Router();
const v1Prefix = '/api/v1';

AppRouter.use(`${v1Prefix}/auth`, AuthRouter);
AppRouter.use(`${v1Prefix}/users`, UserRouter);
AppRouter.use(`${v1Prefix}/example`, ExampleRouter);

export default AppRouter;