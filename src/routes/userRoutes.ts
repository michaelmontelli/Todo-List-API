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
        res.status(400).json({ message: getErrorMessage(error) });
        return;
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
    const token = jwt.sign({ email }, JWT_SECRET);
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

userRouter.post("/login", (req: Request, res: Response) => {
    try {
        validateLoginRequest(req);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
        return;
    }

    // respond with a token if the authentication is successful
    const { email } = req.body;

    const token = jwt.sign({ email }, JWT_SECRET);
    res.status(200).json({ token });
});

function validateLoginRequest(req: Request) {
    const { email, password } = req.body;

    // validate the given email and password
    if (!email || !password) {
        throw new Error("Email and password are required to login");
    }

    const user = users.find(user => user.email === email);

    if (!user) {
        throw new Error("No account exists for this email");
    }

    const { password: storedHashedPassword } = user

    if (!bcrypt.compareSync(password, storedHashedPassword)) {
        throw new Error("Password incorrect");
    }
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error); // fallback just in case
}
