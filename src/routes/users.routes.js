import { Router } from "express";
import { deleteUser, getUser, getUsers, registerUser, updateUser } from "../controllers/users.controllers.js";
import { checkSession } from "../middlewares/session.js";

const router = Router();

//TODO: rutas para registar y logiar ambas son peticones post que que envian datos para guardar o para comparar
router.get('/', checkSession, getUsers);
router.post('/', registerUser);
router.get('/:id', getUser);
//TODO: estas dos rutas al no usar libreria de peticiones en el front no permiten usar los verbos put y delete por lo cual se cambian a get y post y se alarga la ruta
router.get('/delete/:id', deleteUser);
router.post('/update/:id', updateUser);

export {router};