import { controller } from "../controller/phoneNumberController";
import { validRequest } from "../middleware/phoneNumberValidate";
import express from "express";

const router = express.Router();
router.get("/validate", validRequest, controller);

export default router;
