import { NextFunction, Request, Response } from "express";

export interface BaseControllerInterface<T> {
    getAll(req: Request, res: Response, next: NextFunction): Promise<any>,
    getSpecific(req: Request, res: Response, next: NextFunction): Promise<any>,
    create(req: Request, res: Response, next: NextFunction): Promise<any>,
    update(req: Request, res: Response, next: NextFunction): Promise<any>,
    updateMany(req: Request, res: Response, next: NextFunction): Promise<any>,
    delete(req: Request, res: Response, next: NextFunction): Promise<any>,
    deleteMany(req: Request, res: Response, next: NextFunction): Promise<any>,
    count(req: Request, res: Response, next: NextFunction): Promise<any>,
}