import express from 'express';
import { getAllTodos, createTodo, updateTodoStatus } from './todoController';
import multer from 'multer';
import { getImage } from './imageController';
const upload = multer({ storage: multer.memoryStorage() });

const todoRouter = express.Router();
todoRouter.get('/', getAllTodos);
todoRouter.post('/', upload.single('image'),  createTodo);
todoRouter.patch('/:id/status', updateTodoStatus);
// todoRouter.delete('/:id', todoController.deleteTodo);

const imageRouter = express.Router();
imageRouter.get('/:id/', getImage);

export { todoRouter, imageRouter };
