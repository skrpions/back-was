import { Request, Response } from 'express';
import { Certificate } from '../models/certificate';
import User from '../models/user';
import Title from '../models/titles';

// Obtener la lista de certificados
export const getCertificates = async (req: Request, res: Response) => {
	try {
		const listCertificates = await Certificate.findAll({ include: [User, Title] });
		res.json(listCertificates);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener los certificados' });
	}
};

// Obtener la lista de certificados asociados a un usuario (userId)
export const getUserCertificates = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId; // Obtener el ID del usuario de los parámetros de la solicitud
		const userCertificates = await Certificate.findAll({ where: { userId }, include: [Title] });
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
		const certificate = await Certificate.findByPk(id, { include: [User, Title] });
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
		const { userId, titleId, institution, certificationDate, certificateType } = req.body;
		const user = await User.findByPk(userId);
		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}
		const title = await Title.findByPk(titleId);
		if (!title) {
			return res.status(404).json({ error: 'Título no encontrado' });
		}
		const newCertificate = await Certificate.create({
			userId,
			titleId,
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
		const { userId, titleId, institution, certificationDate, certificateType } = req.body;

		// Buscar el certificado actual
		const currentCertificate = await Certificate.findByPk(id);

		if (!currentCertificate) {
			return res.status(404).json({ error: 'Certificado no encontrado' });
		}

		// Crear un objeto con los valores actualizados
		const updatedValues = {
			userId,
			titleId,
			institution,
			certificationDate: new Date(certificationDate).toISOString(),
			certificateType,
		};

		// Actualizar el certificado y obtener el número de filas afectadas
		const [updatedRows] = await Certificate.update(updatedValues, { where: { id } });

		if (updatedRows === 1) {
			// Si se actualizó una fila, buscar y devolver el certificado actualizado
			const updatedCertificate = await Certificate.findByPk(id, { include: [User, Title] });
			res.json(updatedCertificate);
		} else {
			// Si no se actualizó ninguna fila, devolver un mensaje apropiado
			res.status(404).json({ error: 'No se pudo actualizar el certificado' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar el certificado', details: error });
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
