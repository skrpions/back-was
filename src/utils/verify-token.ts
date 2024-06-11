import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define una interfaz extendida de Request que incluya la propiedad 'user'
export interface Request extends ExpressRequest {
	user?: any;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token de la cabecera 'Authorization'

	if (!token) {
		return res.status(401).json({ msg: 'Acceso denegado. No se proporcionó token.' });
	}

	try {
		const secret = process.env.JWT_SECRET || 'was_secret';
		const decoded = jwt.verify(token, secret);
		req.user = decoded; // Agregar la información del usuario a la solicitud
		next();
	} catch (error) {
		res.status(401).json({ msg: 'Token inválido o expirado.' });
	}
};
