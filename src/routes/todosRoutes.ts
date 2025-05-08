import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

const todos = [];

export const todosRouter = Router();

todosRouter.post("/todos", (req: Request, res: Response) => {
    try {
        // User must send the token received from the login endpoint in the header to authenticate the request.
        validateAuthorizationToken(req);
    } catch (error) {
        // TODO: Change error logging so that the error thrown is readable and logged to console
        // TODO: Change error logging so that the final error message that user sees is hardcoded in catch statement top level

        // In case the token is missing or invalid, respond with an error and status code 401
        res.status(401).json({ message: getErrorMessage(error) });
        return;
    }
    res.status(200).send("WORKS");
});

function validateAuthorizationToken(req: Request) {
    const token = extractAuthorizationToken(req);
    if (!token) {
        throw new Error("Unauthorized");
    }
    try {
        jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error("Unauthorized");
    }
}

function extractAuthorizationToken(req: Request) {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return undefined;
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
}
