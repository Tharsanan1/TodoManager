import mongoose, { Document, Model, Schema } from 'mongoose';

export enum Status {
  Todo = "Todo",
  InProgress = "InProgress",
  Done = "Done",
}
export interface TodoData {
  name: string;
  email: string;
  description: string | null;
  status: Status,
  imageUrl: string | null,
  createdAt: Date;
}

export interface ITodo extends Document, TodoData {
  
}

const todoSchema: Schema<ITodo> = new Schema<ITodo>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo: Model<ITodo> = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;
