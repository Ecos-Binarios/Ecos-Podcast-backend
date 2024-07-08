import { Router } from "express";

import fileUpload from "express-fileupload";
import { createCategory, createPodcastCategory, getAllCategories, getCategoriesById, getCategoriesByPodcastId } from "../controllers/categories.controller.js";

const router = Router();

router.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '../tmp/'
}));

router.get('/', getAllCategories);
router.get('/:id', getCategoriesById);
router.get('/:podcastId', getCategoriesByPodcastId);
router.post('/', createCategory);
router.post('/:podcastId', createPodcastCategory);

export { router };