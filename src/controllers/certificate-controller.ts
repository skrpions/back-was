import { Request, Response } from 'express';
import { Certificate } from '../models/certificate';
import User from '../models/user';

// Obtener la lista de certificados
export const getCertificates = async (req: Request, res: Response) => {
	try {
		const listCertificates = await Certificate.findAll({ include: [User] });
		res.json(listCertificates);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener los certificados' });
	}
};

// Obtener la lista de certificados asociados a un usuario (userId)
export const getUserCertificates = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId; // Obtener el ID del usuario de los parámetros de la solicitud
		const userCertificates = await Certificate.findAll({ where: { userId } });
		res.json(userCertificates);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error al obtener los certificados del usuario' });
	}
};

// Obtener un certificado por ID
export const getCertificateById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const certificate = await Certificate.findByPk(id, { include: [User] });
		if (certificate) {
			res.json(certificate);
		} else {
			res.status(404).json({ error: 'Certificado no encontrado' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener el certificado' });
	}
};

// Crear un nuevo certificado
export const createCertificate = async (req: Request, res: Response) => {
	try {
		const { userId, title, institution, certificationDate, certificateType } = req.body;
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}
		const newCertificate = await Certificate.create({
			userId,
			title,
			institution,
			certificationDate,
			certificateType,
		});
		res.status(201).json(newCertificate);
	} catch (error) {
		res.status(500).json({ error: 'Error al crear el certificado' });
	}
};

// Actualizar un certificado por ID
export const updateCertificate = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { userId, title, institution, certificationDate, certificateType } = req.body;
		const [updated] = await Certificate.update(
			{ userId, title, institution, certificationDate, certificateType },
			{ where: { id } }
		);
		if (updated) {
			const updatedCertificate = await Certificate.findByPk(id);
			res.json(updatedCertificate);
		} else {
			res.status(404).json({ error: 'Certificado no encontrado' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar el certificado' });
	}
};

// Eliminar un certificado por ID
export const deleteCertificate = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const deleted = await Certificate.destroy({ where: { id } });
		if (deleted) {
			res.status(204).send();
		} else {
			res.status(404).json({ error: 'Certificado no encontrado' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error al eliminar el certificado' });
	}
};
