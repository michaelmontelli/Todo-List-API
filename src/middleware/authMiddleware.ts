import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../utils";
import { AuthTokenPayload, AuthenticatedRequest } from "../types";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';


export function authenticateRequest(req: Request, res: Response, next: NextFunction) {
    try {
        // User must send the token received from the login endpoint in the header to authenticate the request.
        const decodedToken = validateAuthorizationToken(req);
        if (typeof decodedToken === "object" && "email" in decodedToken) {
            const { email } = decodedToken;
            console.log(`User email: ${email}`);

            (req as AuthenticatedRequest).email = email;
            next();
        } else {
            throw new Error("Invalid token payload");
        }
    } catch (error) {
        console.log(`Error while validating authorization token: ${getErrorMessage(error)}`);

        // In case the token is missing or invalid, respond with "Unauthorized" and status code 401
        res.status(401).json({ message: "Unauthorized" });
    }
}

function validateAuthorizationToken(req: Request): AuthTokenPayload {
    const token = extractAuthorizationToken(req);
    if (!token) {
        const errorMessage = "No token provided";
        throw new Error(errorMessage);
    }
    try {
        return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    } catch (error) {
        const errorMessage = `Unable to verify token: ${getErrorMessage(error)}`;
        throw new Error(errorMessage);
    }
}

function extractAuthorizationToken(req: Request) {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return undefined;
}
