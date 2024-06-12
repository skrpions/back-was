import { Request, Response } from 'express';
import Title from '../models/titles';

// Obtener la lista de títulos
export const getTitles = async (req: Request, res: Response) => {
	try {
		const titles = await Title.findAll();
		res.json(titles);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener los títulos' });
	}
};

// Crear un nuevo título
export const createTitle = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		const newTitle = await Title.create({ name });
		res.status(201).json(newTitle);
	} catch (error) {
		res.status(500).json({ error: 'Error al crear el título' });
	}
};
