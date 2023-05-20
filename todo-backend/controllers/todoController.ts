import todoService from "../services/todoService";
import { Request, Response } from 'express';
import { Status } from "../models/todo";

const getAllTodos = async (_req: Request, res: Response) => {
  try {
    const email = res.locals.email;
    const todos = await todoService.getAllTodos(email);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createTodo = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const email = res.locals.email;
    console.log({ name, description, email });
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    let image = null;

    if (req.file) {
      console.log("Image file identified. With content type: " + req.file.mimetype)
      image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const todo = await todoService.createTodo(
      image?.data || null,
      image?.contentType || "",
      name,
      email,
      description,
      Status.Todo,
    );

    res.status(201).json(todo);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updateTodoStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const status = req.body.status;
    if (!Object.values(Status).includes(status as Status)) {
      res.status(500).send("Invalid status: " + status + " " +  Object.values(Status));
      return;
    }
    const todos = await todoService.updateTodoStatus(id, status);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export {
  getAllTodos,
  createTodo,
  updateTodoStatus
};