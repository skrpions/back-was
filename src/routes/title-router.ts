import { Router } from 'express';
import { getTitles, createTitle } from '../controllers/title-controller';
import { verifyToken } from '../utils/verify-token';

const router = Router();

router.get('/', verifyToken, getTitles); // Obtener todos los títulos
router.post('/', verifyToken, createTitle); // Crear un nuevo título

export default router;
