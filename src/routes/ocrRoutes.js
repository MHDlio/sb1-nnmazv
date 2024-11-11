import express from 'express';
import multer from 'multer';
import { processOCR } from '../controllers/ocrController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/process', upload.single('file'), processOCR);

export default router;