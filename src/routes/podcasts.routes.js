import { Router } from "express";

import fileUpload from "express-fileupload";
import { createPodcast, deletePodcast, getAllCategories, getAllPodcasts, getAllPodcastsByUserId, getCategoriesByPodcastId, getEpisodesByPodcastId, getPodcastById, updatePodcast } from "../controllers/podcasts.controller.js";
import { getAllPodcastsByUserIdModel } from "../models/podcasts.models.js";

const router = Router();

router.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '../tmp/'
}));

router.get('/', getAllPodcasts);
router.get('/:id', getPodcastById);
router.get('/:podcastId/episodes', getEpisodesByPodcastId);
router.post('/', createPodcast);
router.patch('/:id', updatePodcast);
router.delete('/:id', deletePodcast);
router.get('/user/search', getAllPodcastsByUserId);
router.get('/:podcastId/categories', getCategoriesByPodcastId);
router.get('/categories', getAllCategories);

export { router };