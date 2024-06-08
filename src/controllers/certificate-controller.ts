import { Request, Response } from 'express';

export const getCertificates = (req: Request, res: Response) => {
	res.json({
		msg: 'Get certificates',
	});
};
