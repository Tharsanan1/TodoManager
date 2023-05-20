import { getImageById } from '../repositories/imageRepository';

const imageService = {
  getImage: async (id: string) => {
    return getImageById(id);
  },
};


export default imageService;
