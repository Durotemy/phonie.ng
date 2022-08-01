import { mtn } from "../controller/userController";
import express from "express";
const router = express.Router();
router.get("/login", mtn);
export default router;
