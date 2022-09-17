import { getTelcoController } from "../controller/telco";
import { validRequest } from "../middleware/phoneNumberValidate";
import express from "express";

const router = express.Router();
router.post("/validate", validRequest, getTelcoController);

export default router;
