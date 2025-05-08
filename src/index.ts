import dotenv from 'dotenv';
import express, { Request, Response } from "express";
import { usersRouter, todosRouter } from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", usersRouter);
app.use("/", todosRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
