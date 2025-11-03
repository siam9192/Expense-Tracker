import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
app.use(express.json());

app.use(cors());
app.use(express.json());

// app.use('/api/v1', routes);

// app.use(GlobalErrorHandler);

app.use((req, res) => {
  if (req.url === "/") {
    res.status(200).json({
      message: "Hey welcome to  server",
    });
  }
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});
export default app;
