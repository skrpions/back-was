// controllers/user-controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
	try {
		const { username, password, name, lastname, boss } = req.body;

		// Validar que todos los campos requeridos están presentes
		if (!username || !password || !name || !lastname || !boss) {
			return res.status(400).json({
				msg: 'Por favor, complete todos los campos',
			});
		}

		// Verificar si el usuario ya existe
		const existingUser = await User.findOne({ where: { username } });
		if (existingUser) {
			return res.status(400).json({
				msg: 'El nombre de usuario ya está en uso',
			});
		}

		// Encriptar la contraseña
		const hashedPassword = await bcrypt.hash(password, 10);

		// Crear el nuevo usuario
		const newUser: any = await User.create({
			username,
			password: hashedPassword,
			name,
			lastname,
			boss,
		});

		// Enviar respuesta exitosa
		res.status(201).json({
			msg: 'Usuario Creado',
			user: {
				id: newUser.id,
				username: newUser.username,
				name: newUser.name,
				lastname: newUser.lastname,
				boss: newUser.boss,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			msg: 'Error al crear el usuario',
			error,
		});
	}
};
export const loginUser = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;

		// Validar que ambos campos están presentes
		if (!username || !password) {
			return res.status(400).json({
				msg: 'Por favor, complete todos los campos',
			});
		}

		// Buscar al usuario por su nombre de usuario
		const user: any = await User.findOne({ where: { username } });
		if (!user) {
			return res.status(400).json({
				msg: 'Usuario o contraseña incorrectos',
			});
		}

		// Verificar la contraseña
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				msg: 'Usuario o contraseña incorrectos',
			});
		}

		// Generar el token de autenticación (opcional)
		const token = jwt.sign(
			{ id: user.id, username: user.username, name: user.name, lastname: user.lastname },
			process.env.JWT_SECRET || 'was_secret',
			{ expiresIn: '1h' } // Configuración del tiempo de expiración
		);

		// Responder con el usuario autenticado y el token
		res.json({
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			msg: 'Error al iniciar sesión',
			error,
		});
	}
};
