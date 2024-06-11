//TODO: punto de coexion con toda la estructura.
import express from 'express';

//TODO: puerto tomado del .env
const PORT = process.env.PORT || 3000;
//TODO: inicializamos express
const app = express();
//TODO: usamos el metodo listen para levantar el servidor
app.listen(PORT, () => {console.log(`Server running on PORT: ${PORT}`)})