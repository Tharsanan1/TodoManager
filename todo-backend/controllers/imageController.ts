import imageService from "../services/imageService";
import { Request, Response } from 'express';
import { Status } from "../models/todo";

const getImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const email = res.locals.email;
    const image = await imageService.getImage(id);
    console.log(image?.email, email);
    if (image?.email === email) {
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.setHeader("Expires", new Date(Date.now() + 3600000).toUTCString()); 
      res.contentType(image?.contentType || "");
      res.send(image?.data);
    } else {
      res.status(404).send("Not found");
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export {
  getImage,
};