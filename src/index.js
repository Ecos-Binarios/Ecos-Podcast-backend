//TODO: punto de coexion con toda la estructura.
import express from 'express';
import { router } from './routes/index.routes.js';
import pool from './db/config.js';
import morgan from 'morgan';

//TODO: puerto tomado del .env
const PORT = process.env.PORT || 3000;
//TODO: inicializamos express
const app = express();
//TODO: Middleware para el registro de solicitudes HTTP usando Morgan nos muestra las solicitudes al servidor y su respuesta
app.use(morgan('dev'));
//TODO: Middkeware para parsear json y encoder
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
//TODO: verificacion de conexion con la base de datos al leantar el servidor 
pool.getConnection();
//TODO: aca usamos el archivo de rutas dinamicas que creamos
app.use(router);
//TODO: usamos el metodo listen para levantar el servidor
app.listen(PORT, () => {console.log(`Server running on PORT: ${PORT}`)})