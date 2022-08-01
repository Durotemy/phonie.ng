"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controller/userController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/login", userController_1.mtn);
exports.default = router;
