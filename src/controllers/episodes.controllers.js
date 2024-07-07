import { deleteAudio, deleteImage, uploadFile } from "../config/cloudinary.js";
import {  createEpisodeModel, deleteEpisodeModel, getAllEpisodesModel, getEpisodeByIdModel, updateEpisodeModel } from "../models/episodes.models.js";
export const createEpisode = async (req, res) => {
    try {
        const result1 = await uploadFile(req.files.audio);
        const result2 = await uploadFile(req.files.img);
        const episode = await createEpisodeModel(req.body, result1.secure_url, result1.public_id, result2.secure_url, result2.public_id);
        return res.status(200).json(episode);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllEpisodes = async (req, res) => {
    try {
        const result = await getAllEpisodesModel();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getEpisodeById = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await getEpisodeByIdModel(id);
        if(result.length === 0) return res.status(404).json({message: "Episodio no encontrado"});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateEpisode = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await updateEpisodeModel(id, req.body);
        if(result.affectedRows === 0) return res.status(404).json({message: "Error al actualizar el Espisodio"});
        return res.status(200).json({message: "Episodio actualizado"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteEpisode = async (req, res) => {
    const episodeId = req.params.id;
    try {
        const [ { audio_public_id, img_public_id} ] = await getEpisodeByIdModel(episodeId);
        // console.log(audio_public_id, img_public_id);

        const resultImage = await deleteImage(img_public_id);
        const resultAudio = await deleteAudio(audio_public_id);
        console.log(resultImage, resultAudio);

        if(resultImage.result !== 'ok' && resultAudio.result !== 'ok') return res.status(404).json({message: "Error al borrar el Espisodio"});   

        const episode = await deleteEpisodeModel(episodeId);

        if(episode.affectedRows === 0) return res.status(404).json({message: "Error al borrar el espisodio"});

        return res.status(200).json({message: "Episodio borrado"});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};