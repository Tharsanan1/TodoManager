import Todo, { ITodo, Status, TodoData } from '../models/todo';

const getAllTodosByEmail = async (email: string) => {
  return Todo.find({
    email: email
  });
};

const createTodo = async (todo : TodoData): Promise<ITodo | null> => {
  return Todo.create(todo);
};

const updateTodoStatus = async (id: string, status: string): Promise<TodoData | null> => {
  try {
    const todo = await Todo.findByIdAndUpdate(id, { status }, { new: true });
    return todo;
  } catch (error) {
    throw new Error('Error updating todo status');
  }
};

const deleteTodo = async (id: string) => {
  return Todo.findByIdAndDelete(id);
};

export {
  getAllTodosByEmail,
  createTodo,
  updateTodoStatus,
  deleteTodo
};
