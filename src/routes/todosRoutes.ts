import { Router, Request, Response } from "express";
import { getErrorMessage } from "../utils";
import { authenticateRequest } from "../middleware";
import { AuthenticatedRequest } from "../types";

interface TodoItem {
    id: number;
    email: string;
    title: string;
    description: string;
}

let lastTodoItemId = 0;
const todos: TodoItem[] = [];

export const todosRouter = Router();
todosRouter.use(authenticateRequest);

todosRouter.post("/todos", (req: Request, res: Response) => {
    try {
        validateCreateTodoItemRequest(req);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
        return;
    }

    const { title, description } = req.body;

    const newTodoItem = {
        id: ++lastTodoItemId,
        email: (req as AuthenticatedRequest).email,
        title,
        description,
    };
    todos.push(newTodoItem);

    const { email, ...newTodoItemWithoutEmail } = newTodoItem;
    res.status(200).send(newTodoItemWithoutEmail);
});

function validateCreateTodoItemRequest(req: Request) {
    const { title, description } = req.body;
    if (!title || !description) {
        throw new Error("Title and description are required to create a todo item");
    }
}
