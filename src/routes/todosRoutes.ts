import { Router, Request, Response } from "express";
import { getErrorMessage } from "../utils";
import { authenticateRequest } from "../middleware";
import { AuthenticatedRequest } from "../types";

const DEFAULT_PAGE = 1;
const DEFAULT_ITEM_LIMIT = 10;

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

        // Respond with an error and status code 403
        // if the user is not authorized to update the item.
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

    // Also make sure to validate the user has the permission to update the to-do item
    // i.e. the user is the creator of todo item that they are updating
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
    // User must be authenticated and authorized to delete the to-do item.
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

    // Upon successful deletion, respond with the status code 204.
    res.status(204).send("Todo item deleted successfully" );
});

interface GetTodoItemsRequestQueryParams {
    page: number;
    limit: number;
}

todosRouter.get("/todos", (req: Request, res: Response) => {
    let queryParams: GetTodoItemsRequestQueryParams;
    try {
        queryParams = validateGetTodoItemsRequest(req);
    } catch (error) {
        const message = getErrorMessage(error);
        res.status(400).json({ message });
        return;
    }

    const { page, limit } = queryParams;
    const userTodosWithoutEmail = todos.filter(todo => todo.email === (req as AuthenticatedRequest).email)
                                        .map(todo => extractTodoItemWithoutEmail(todo));

    const startIndex = (page - 1) * limit;
    const paginatedTodos = userTodosWithoutEmail.slice(startIndex, startIndex + limit);

    res.status(200).json({
        data: paginatedTodos,
        page,
        limit,
        total: userTodosWithoutEmail.length,
    });
});

function validateGetTodoItemsRequest(req: Request): GetTodoItemsRequestQueryParams {
    const { page, limit } = req.query;

    const parsedPage = page ? parseInt(String(page)) : DEFAULT_PAGE;
    const parsedLimit = limit ? parseInt(String(limit)) : DEFAULT_ITEM_LIMIT;

    if (isNaN(parsedPage) || parsedPage <= 0) {
        throw new Error("Invalid 'page' parameter");
    }

    if (isNaN(parsedLimit) || parsedLimit <= 0) {
        throw new Error("Invalid 'limit' parameter");
    }

    return { page: parsedPage, limit: parsedLimit };
}