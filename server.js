import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
import "express-async-errors";
//
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

// middleware notOFound

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}
app.use(cors());
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());

app.use("/auth/v1/api", authRouter);
app.use("/auth/v1/api/jobs", authenticateUser, jobsRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log("...Running");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
