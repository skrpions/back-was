import { Router } from 'express';
import { getCertificates } from '../controllers/certificate-controller';

const router = Router();

// Gets
router.get('/', getCertificates);

// Post

export default router;
