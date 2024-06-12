import express, { Application } from 'express';
import routesCertificate from '../routes/certificate-router';
import routesUser from '../routes/user-router';
import { Certificate } from './certificate';
import User from './user';
import cors from 'cors';

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
		this._app.use('/api/certificates', routesCertificate);
		this._app.use('/api/users', routesUser);
	}

	async dbConnection() {
		try {
			// await sequelize.authenticate(); // Testear Connection
			// console.log('Database online');

			await Certificate.sync();
			await User.sync();
		} catch (error) {
			console.log('Unable to connect to database', error);
		}
	}
}

export default Server;
