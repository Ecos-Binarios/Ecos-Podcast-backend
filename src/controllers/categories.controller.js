import { createCategoryModel, createPodcastCategoryModel, getAllCategoriesModel, getCategoriesByPodcastIdModel } from "../models/categories.models.js";

export const getAllCategories = async (req, res) => {
    try {
        const result = await getAllCategoriesModel();
        if (result.length === 0) return res.status(404).json({ message: "No hay categorías" });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await createCategoryModel(name);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Error al crear la categoría" });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createPodcastCategory = async (req, res) => {
    try {
        const { categoryId } = req.body;
        const { podcastId } = req.params;
        const result = await createPodcastCategoryModel(podcastId, categoryId);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Error al crear la categoría" });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getCategoriesByPodcastId = async (req, res) => {
    const podcastId = req.params.podcastId;
    try {
        const result = await getCategoriesByPodcastIdModel(podcastId);
        if (result.length === 0) return res.status(404).json({ message: "Categorias no encontradas" });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}