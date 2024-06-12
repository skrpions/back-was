import express, { Application } from 'express';
import routesCertificate from '../routes/certificate-router';
import routesUser from '../routes/user-router';
import routesTitle from '../routes/title-router';
import { Certificate } from './certificate';
import User from './user';
import cors from 'cors';
import Title from './titles';

class Server {
	private _app: Application;
	private _port: string;

	constructor() {
		this._app = express();
		this._port = process.env.PORT || '3001';

		this.listen();
		this.middlewares();
		this.routes();
		this.dbConnection();
	}

	listen() {
		this._app.listen(this._port, () => {
			console.log(`Server running on port ${this._port}`);
		});
	}

	middlewares() {
		// Parseo body
		this._app.use(express.json());

		// Cors
		this._app.use(cors());
	}

	routes() {
		this._app.use('/api/titles', routesTitle); // Añadir rutas de titles
		this._app.use('/api/users', routesUser);
		this._app.use('/api/certificates', routesCertificate);
	}

	async dbConnection() {
		try {
			await Title.sync();
			await User.sync();
			await Certificate.sync();
		} catch (error) {
			console.log('Unable to connect to database', error);
		}
	}
}

export default Server;
