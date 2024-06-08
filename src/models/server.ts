import express, { Application } from 'express';
import routesCertificate from '../routes/certificate-router';
import routesUser from '../routes/user-router';

class Server {
	private _app: Application;
	private _port: string;

	constructor() {
		this._app = express();
		this._port = process.env.PORT || '3000';

		this.middlewares();
		this.routes();
		this.listen();
	}

	listen() {
		this._app.listen(this._port, () => {
			console.log(`Server running on port ${this._port}`);
		});
	}

	middlewares() {
		this._app.use(express.json());
	}

	routes() {
		this._app.use('/api/certificates', routesCertificate);
		this._app.use('/api/users', routesUser);
	}
}

export default Server;
