import { createImage } from '../repositories/imageRepository';
import { createTodo, getAllTodosByEmail, updateTodoStatus } from '../repositories/todoRepository';
import { ITodo, Status } from '../models/todo';

const todoService = {
  createTodo: async (
    imageBuffer: Buffer | null,
    contentType: string,
    name: string,
    email: string,
    description: string,
    status: Status
  ): Promise<ITodo | null> => {
    try {
      let imageUrl = null;
      if (imageBuffer != null) {
        const image = await createImage(imageBuffer, contentType, email);
        imageUrl = `/image/${image._id}`;
      } 
      const createdAt = new Date();
      const newTodo = {
        name,
        email,
        description,
        status,
        imageUrl, 
        createdAt
      };
      const createdTodo = await createTodo(newTodo);
      return createdTodo;
    } catch (error) {
      console.log(error)
      throw new Error('Error creating todo with image');
    }
  },
  getAllTodos: async (email: string) => {
    return getAllTodosByEmail(email);
  },
  updateTodoStatus: async (id: string, status: Status) => {
    return updateTodoStatus(id, status);
  }
};

export default todoService;
