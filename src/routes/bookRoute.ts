import express from 'express';
import multer from 'multer';
import { authenticateJWT, authorizeSeller } from '../middleware/authMiddleware';
import { uploadBooks, getBooks, getBook, updateBook, deleteBook } from '../controllers/bookController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authenticateJWT,authorizeSeller, upload.single('file'), uploadBooks);
router.get('/', getBooks);
router.get('/:id', getBook);
router.put('/:id', authenticateJWT, authorizeSeller, updateBook);
router.delete('/:id', authenticateJWT, authorizeSeller, deleteBook);

export default router;
