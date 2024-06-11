import { Router } from "express";

const router = Router();

//TODO: rutas para registar y logiar ambas son peticones post que que envian datos para guardar o para comparar
router.get('/', (req, res) => {
    res.send("audios")
});

export {router};