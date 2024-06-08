import dotenv from 'dotenv';
import Server from './models/server';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Inicializar y ejecutar el servidor
const server = new Server();
