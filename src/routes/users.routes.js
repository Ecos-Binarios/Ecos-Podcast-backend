import { Router } from "express";
import { getUsers } from "../controllers/users.controllers.js";

const router = Router();

//TODO: rutas para registar y logiar ambas son peticones post que que envian datos para guardar o para comparar
router.get('/', getUsers);
router.get('/:id',(req, res) => {
    res.send("un solo usuario");
} )

export {router};