import { Router } from "express";
import { login, register } from "../controllers/auth.controllers.js";

const router = Router();

//TODO: rutas para registar y logiar ambas son peticones post que que envian datos para guardar o para comparar
router.post('/register', register);
router.post('/login', login);

export {router};