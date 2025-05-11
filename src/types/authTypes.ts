import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthTokenPayload extends JwtPayload {
    email: string;
}

export interface AuthenticatedRequest extends Request {
    email: string;
}