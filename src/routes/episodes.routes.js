import { Router } from "express";
import fileUpload from "express-fileupload";
import { createEpisode, deleteEpisode, getAllEpisodes, getEpisodeById, updateEpisode } from "../controllers/episodes.controllers.js";

const router = Router();

router.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '../tmp/'
}));

router.post('/', createEpisode);
router.get('/', getAllEpisodes);
router.get('/:id', getEpisodeById);
router.patch('/:id', updateEpisode);
router.delete('/:id', deleteEpisode);

export {router};