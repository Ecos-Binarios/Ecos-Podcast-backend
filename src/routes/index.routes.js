//OPTIMIZE: Creamos archivo de rutas dinamicas usando node js
import { Router } from "express";
//TODO: usamos la duncion readdirSync del modulo fs de node para poder leer de forma asincrona un directorio 
import { readdirSync }  from 'fs';

//TODO: para poder tener la ruta absoluta necesito importar 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//TODO: creo las rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//TODO: guardamos en una constante el path de nuestro directorio donde tenemos las rutas
const PATH_ROUTER = `${__dirname}`;
//console.log(PATH_ROUTER);


//TODO: inicializamos el metodo router
const router = Router();

//TODO: esta funcion me va a servir para limpiar la ruta y quedarme con le nombre de mi ruta
const cleanFileName = (fileName) => {
    const file = fileName.split('.').shift(); //separa el string por los puntos para transformarlo en un array despues shift me devuelve el primer elemento de ese array
    return file; //retorno ese elemento
}

//TODO: usamos la funcion readdirSync
readdirSync(PATH_ROUTER).filter((fileName) => {
   const cleanName = cleanFileName(fileName);
//TODO: compruebo que la ruta no sea mi archivo index el cual no tengo que generar una ruta ya que es este archivo
   if(cleanName !== "index"){
    //TODO: si la ruta no es el archivo index genero la ruta para verla por consola
       console.log(`The route is loading /${cleanName}`);
       //TODO: importamos el archivo creado el cual va a contener rutas especificas ejemplo : user va a tener todos los user
       import(`./${cleanName}.routes.js`).then((moduleRouter) => {
         //TODO: usamos la ruta creada y las funciones ade ntro del archivo si no hay funciones adentro genera un error
         router.use(`/api/${cleanName}`, moduleRouter.router)
     }).catch(error => {
      console.error(`una de las rutas no tiene funcione definidas para ser usadas por el router`, error)
     })
   }
});

//TODO: exportamos la ruta para usarla en el index
export {router};
