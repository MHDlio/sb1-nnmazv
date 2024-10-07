import express from 'express';
import { getForms, getFormById, submitForm } from '../controllers/formController.js';

const router = express.Router();

router.get('/', getForms);
router.get('/:id', getFormById);
router.post('/:id/submit', submitForm);

export default router;