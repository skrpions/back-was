import { Router } from 'express';
import {
	getCertificates,
	getCertificateById,
	createCertificate,
	updateCertificate,
	deleteCertificate,
} from '../controllers/certificate-controller';

const router = Router();

router.get('/', getCertificates); // Obtener todos los certificados
router.get('/:id', getCertificateById); // Obtener un certificado por ID
router.post('/', createCertificate); // Crear un nuevo certificado
router.put('/:id', updateCertificate); // Actualizar un certificado por ID
router.delete('/:id', deleteCertificate); // Eliminar un certificado por ID

export default router;
