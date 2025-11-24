import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
const app = express();
app.use(express.json());

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    status,
    status_code: statusCode,
    message: err.message || "Something went wrong",
  });
});

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
