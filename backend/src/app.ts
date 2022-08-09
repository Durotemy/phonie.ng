import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import router from "./routes/phoneNumber";
import dotenv from "dotenv";
import connectDB from "./config/db";

 dotenv.config();

connectDB();
const app = express();

dotenv.config();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", router);
const port = process.env.PORT || 2500;
console.log("app is running on port", process.env.PORT);

module.exports = app;
