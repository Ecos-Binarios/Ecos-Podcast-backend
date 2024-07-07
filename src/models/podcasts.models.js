import pool from "../db/config.js";

export const getAllPodcastsModel = async () => {
    const $sql = `SELECT podcasts.*, users.name as host FROM podcasts
                    JOIN users ON users.id = podcasts.user_id;`;
    const [rows, fields] = await pool.query($sql);
    return rows;
}

export const getPodcastByIdModel = async (id) => {
    const $sql = `SELECT * FROM podcasts WHERE id = ?`;
    const [rows, fields] = await pool.query($sql, [id]);
    return rows;
}

export const createPodcastModel = async (newPodcast, secure_url, public_id) => {
    const { title, description, userId } = newPodcast;
    const $sql = `INSERT INTO podcasts (title, description, user_id, img_secure_url, img_public_id) VALUES (?, ?, ? , ?, ?);`;
    const [rows, fields] = await pool.query($sql, [title, description, userId, secure_url, public_id]);    
    return rows.affectedRows === 0 ? { message: "Error al subir el podcast" } : { id: rows.insertId, ...newPodcast, secure_url, public_id };
}

export const updatePodcastModel = async (id, body) => {
    const $sql = `UPDATE podcasts SET ? WHERE id = ?`;
    const [rows, fields] = await pool.query($sql, [body, id]);
    return rows.affectedRows === 0 ? { message: "Error al actualizar el podcast" } : { message: "Podcast actualizado" };
}

export const deletePodcastModel = async (id) => {
    const $sql = `DELETE FROM podcasts WHERE id = ?`;
    const [rows, fields] = await pool.query($sql, [id]);
    return rows.affectedRows === 0 ? { message: "Error al borrar el podcast" } : { message: "Podcast borrado" };
}

export const getEpisodesByPodcastIdModel = async (podcastId) => {
    const $sql = `SELECT * FROM episodes WHERE podcast_id = ?`;
    const [rows, fields] = await pool.query($sql, [podcastId]);
    return rows;
}


export const getAllPodcastsByUserIdModel = async (userId) => {
    const $sql = `SELECT podcasts.*, users.name as host FROM podcasts
       JOIN users ON users.id = podcasts.user_id WHERE podcasts.user_id = ?`;
    const [rows, fields] = await pool.query($sql, [userId]);
    return rows;
}

export const getCategoriesByPodcastIdModel = async (podcastId) => {
    const $sql = `SELECT categories.name, categories.id as category_id FROM categories
       JOIN podcast_categories ON podcast_categories.category_id = categories.id
       WHERE podcast_categories.podcast_id = ?`;
    const [rows, fields] = await pool.query($sql, [podcastId]);
    return rows;
}

export const getAllCategoriesModel = async () => {
    const $sql = `SELECT * FROM categories`;
    const [rows, fields] = await pool.query($sql);
    return rows;
}

