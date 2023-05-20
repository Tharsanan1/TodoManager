import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { imageRouter, todoRouter } from './controllers/routes'
import cors from 'cors';
import jwt, {JwtPayload} from 'jsonwebtoken';

const { auth } = require('express-oauth2-jwt-bearer');
const checkJwt = auth({
  audience: `${process.env.AUTH0_API_IDENTIFIER}`,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

const app = express();
app.use(cors());

const config = {
  dbUrl: process.env.DB_URL || "",
  port: process.env.PORT || 8081 
}

// Connect to the database
mongoose
  .connect(config.dbUrl)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error: Error) => {
    console.error('Error connecting to the database:', error);
  });

app.use(express.json());

// Middleware to extract and decode access token
app.use((req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  
  if (accessToken) {
    try {
      const decodedToken = jwt.decode(accessToken);
      if (decodedToken&& typeof decodedToken != 'string') {
        
        const emailIdentifier = process.env.EMAIL_IDENTIFIER || "";
        
        res.locals.email = decodedToken[emailIdentifier] || "";
      }
    } catch (error) {
      console.error('Error decoding access token:', error);
    }
  }
  
  next();
});


app.use('/todo', checkJwt, todoRouter);
app.use('/image', checkJwt, imageRouter);

// Start the server
const port = config.port || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
