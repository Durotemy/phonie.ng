import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import userRoute from "./routes/userRoute";
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRoute);

console.log("process", process.env.PORT);
const port: any = process.env.PORT || 2500;
module.exports = app;
