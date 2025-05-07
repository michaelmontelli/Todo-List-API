import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

interface User {
    email: string;
    password: string;
}

const users: User[] = [];

export const userRouter = Router();

userRouter.post("/register", (req: Request, res: Response) => {
    try {
        validateCreateAccountRequest(req);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
            return;
        }
    }

    // hash the password
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    // store the user details in the database
    const newUser = { 
        email,
        password: hashedPassword,
    };
    users.push(newUser);

    // Respond with a token that can be used for authentication if the registration is successful
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
});

function validateCreateAccountRequest(req: Request) {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Email and password are required to create an account");
    }

    // make sure the email is unique
    const existingEmails = users.map(user => user.email);

    if (existingEmails.includes(email)) {
        throw new Error("An account already exists with this email");
    }
}

