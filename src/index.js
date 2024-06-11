//TODO: punto de coexion con toda la estructura.
import express from 'express';
import pool from './db/config.js';

//TODO: puerto tomado del .env
const PORT = process.env.PORT || 3000;
//TODO: inicializamos express
const app = express();




//TODO: verificacion de conexion con la base de datos al leantar el servidor 
pool.getConnection()
//TODO: usamos el metodo listen para levantar el servidor
app.listen(PORT, () => {console.log(`Server running on PORT: ${PORT}`)})