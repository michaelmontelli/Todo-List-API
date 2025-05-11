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

    res.status(200).send(
        extractTodoItemWithoutEmail(newTodoItem)
    );
});

function validateCreateTodoItemRequest(req: Request) {
    const { title, description } = req.body;
    if (!title || !description) {
        throw new Error("Title and description are required to create a todo item");
    }
}

todosRouter.put("/todos/:id", (req: Request, res: Response) => {
    let todoItem: TodoItem;
    try {
        todoItem = validateUpdateTodoItemRequest(req);
    } catch (error) {
        const message = getErrorMessage(error);

        if (message === "Forbidden") {
            res.status(403).json({ message });
        } else {
            res.status(400).json({ message });
        }
        return;
    }

    const { title, description } = req.body;
    todoItem.title = title;
    todoItem.description = description;

    res.status(200).json(
        extractTodoItemWithoutEmail(todoItem)
    );
});

function validateUpdateTodoItemRequest(req: Request): TodoItem {
    const todoItem = validateTodoIdInRequest(req);

    const { title, description } = req.body;
    if (!title || !description) {
        throw new Error("Title and description are required to update a todo item");
    }

    return todoItem;
}

function validateTodoIdInRequest(req: Request): TodoItem {
    const idAsString = req.params.id;
    if (!idAsString) {
        throw new Error("Todo item id required");
    }

    const todoId = parseInt(idAsString);
    if (isNaN(todoId)) {
        throw new Error("Invalid todo item id provided");
    }

    const todoItem = todos.find(todo => todo.id === todoId);
    if (!todoItem) {
        throw new Error("Invalid todo item id provided");
    }

    if (todoItem.email !== (req as AuthenticatedRequest).email) {
        throw new Error("Forbidden");
    }

    return todoItem;
}

function extractTodoItemWithoutEmail(todoItem: TodoItem) {
    const { email, ...todoItemWithoutEmail } = todoItem;
    return todoItemWithoutEmail;
}

todosRouter.delete("/todos/:id", (req: Request, res: Response) => {
    let todoItem: TodoItem;
    try {
        todoItem = validateTodoIdInRequest(req);
    } catch (error) {
        const message = getErrorMessage(error);

        if (message === "Forbidden") {
            res.status(403).json({ message });
        } else {
            res.status(400).json({ message });
        }
        return;
    }

    const index = todos.findIndex(todo => todo.id === todoItem.id);
    if (index !== -1) {
        todos.splice(index, 1);
    }
    res.status(204).send("Todo item deleted successfully" );
});
