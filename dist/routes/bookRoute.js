"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const bookController_1 = require("../controllers/bookController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/upload', authMiddleware_1.authenticateJWT, authMiddleware_1.authorizeSeller, upload.single('file'), bookController_1.uploadBooks);
router.get('/', bookController_1.getBooks);
router.get('/:id', bookController_1.getBook);
router.put('/:id', authMiddleware_1.authenticateJWT, authMiddleware_1.authorizeSeller, bookController_1.updateBook);
router.delete('/:id', authMiddleware_1.authenticateJWT, authMiddleware_1.authorizeSeller, bookController_1.deleteBook);
exports.default = router;
