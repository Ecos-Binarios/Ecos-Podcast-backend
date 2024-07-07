
import { deleteImage, uploadFile } from "../config/cloudinary.js";
import { createPodcastModel, deletePodcastModel, getAllCategoriesModel, getAllPodcastsByUserIdModel, getAllPodcastsModel, getCategoriesByPodcastIdModel, getEpisodesByPodcastIdModel, getPodcastByIdModel, updatePodcastModel } from "../models/podcasts.models.js";

export const getAllPodcasts = async (req, res) => {
    try {
        const result = await getAllPodcastsModel();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createPodcast = async (req, res) => {
    try {
        // console.log(req.body);
        const result = await uploadFile(req.files.img);
        // console.log(result);
        const response = await createPodcastModel(req.body, result.secure_url, result.public_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getPodcastById = async (req, res) => {
    const podcastId = req.params.id;
    try {
        const result = await getPodcastByIdModel(podcastId);
        if(result.length === 0) return res.status(404).json({message: "Podcast no encontrado"});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePodcast = async (req, res) => {
    const podcastId = req.params.id;
    const newPodcast = req.body;
    try {
        const result = await updatePodcastModel(podcastId, newPodcast);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deletePodcast = async (req, res) => {
    const podcastId = req.params.id;
    try {
        const [ { img_public_id }] = await getPodcastByIdModel(podcastId);
        const result = await deleteImage(img_public_id);
        const response = await deletePodcastModel(podcastId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getEpisodesByPodcastId = async (req, res) => {
    const podcastId = req.params.podcastId;
    try {
        const result = await getEpisodesByPodcastIdModel(podcastId);
        if(result.length === 0) return res.status(404).json({message: "Podcast no encontrado"});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllPodcastsByUserId = async (req, res) => {

    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ message: 'El parámetro userId es obligatorio' });
        }

        const result = await getAllPodcastsByUserIdModel(userId);
        if(result.length === 0) return res.status(404).json({message: "Podcast no encontrado"});
        
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getCategoriesByPodcastId = async (req, res) => {
    const podcastId = req.params.podcastId;
    try {
        const result = await getCategoriesByPodcastIdModel(podcastId);
        if(result.length === 0) return res.status(404).json({message: "Podcast no encontrado"});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const result = await getAllCategoriesModel();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
