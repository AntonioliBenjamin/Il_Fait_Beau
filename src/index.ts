import "dotenv/config";
import express from "express";
import * as mongoose from "mongoose";
const port = +process.env.PORT;

mongoose.connect("mongodb://127.0.0.1:27017/spotyone_data", (err) => {
    if (err) {
      throw err;
    }
    console.info("Connected to mongodb");
  });
  
  const app = express();

  app.use(express.json());

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
  