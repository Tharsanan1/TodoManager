import mongoose, { Document, Model, Schema } from 'mongoose';


export interface IImage extends Document {
  data: Buffer;
  contentType: string;
  email: string
}

const imageSchema: Schema<IImage> = new Schema<IImage>({
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  email: {
    type: String, 
    required: true
  }
});

const Todo: Model<IImage> = mongoose.model<IImage>('Image', imageSchema);

export default Todo;
