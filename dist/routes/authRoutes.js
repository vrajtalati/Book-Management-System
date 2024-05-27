"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/register/user', authController_1.registerUser);
router.post('/register/seller', authController_1.registerSeller);
router.post('/login/user', authController_1.loginUser);
router.post('/login/seller', authController_1.loginSeller);
exports.default = router;
