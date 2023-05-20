import ImageModel, { IImage } from '../models/image';

const createImage = async (data: Buffer, contentType: string, email: string): Promise<IImage> => {
  try {
    const image = new ImageModel({ data, contentType, email });
    const savedImage = await image.save();
    return savedImage;
  } catch (error) {
    console.log(error)
    throw new Error('Error creating image');
  }
};

const getImageById = async (id: string): Promise<IImage | null> => {
  try {
    const image = await ImageModel.findById(id);
    return image;
  } catch (error) {
    throw new Error('Error retrieving image');
  }
};

const deleteImage = async (id: string): Promise<void> => {
  try {
    await ImageModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting image');
  }
};

export { createImage, getImageById, deleteImage };
