import { Router } from 'express';
import {
	getCertificates,
	getCertificateById,
	createCertificate,
	updateCertificate,
	deleteCertificate,
	getUserCertificates,
} from '../controllers/certificate-controller';
import { verifyToken } from '../utils/verify-token';

const router = Router();

router.get('/', verifyToken, getCertificates); // Obtener todos los certificados
router.get('/:id', verifyToken, getCertificateById); // Obtener un certificado por ID
router.post('/', verifyToken, createCertificate); // Crear un nuevo certificado
router.put('/:id', verifyToken, updateCertificate); // Actualizar un certificado por ID
router.delete('/:id', verifyToken, deleteCertificate); // Eliminar un certificado por ID

// Obtener los certificados de un usuario específico
router.get('/user/:userId', verifyToken, getUserCertificates);

export default router;
