import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to my first mern project!");
});

app.use('/books', booksRoute);
//Middleware for handling CORS policy
//Option1: Allow all origins with default of cors(*)
app.use(cors());

//Option2: Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ['GET', 'POST', "PUT", "DELETE"],
//     allowedHeaders : ['Content-Type'],
//   })
// )


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
