import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();


app.use(cors());
app.use(bodyParser.json());

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log("Server running on http://localhost:4000");
    });
  })
  .catch((error) => console.error(error));
