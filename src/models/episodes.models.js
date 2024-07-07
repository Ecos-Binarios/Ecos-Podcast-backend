import pool from "../db/config.js";


export const getAllEpisodesModel = async () => {
    const $sql = `SELECT episodes.*, users.name as host FROM episodes
                    JOIN podcasts ON episodes.podcast_id = podcasts.id
                    JOIN users ON users.id = podcasts.user_id;`;
    const [rows, fields] = await pool.query($sql);
    return rows;
};

export const createEpisodeModel = async (newEpisode, audio_secure_url, audio_public_id, img_secure_url, img_public_id) => {
    const { title, description, podcastId } = newEpisode;
    const $sql = `INSERT INTO episodes (title, description, podcast_id, audio_secure_url, audio_public_id, img_secure_url, img_public_id)
    VALUES (?,?,?,?,?,?,?)`;
    const [rows, fields] = await pool.query($sql, [
        title, description, podcastId, audio_secure_url, audio_public_id, img_secure_url, img_public_id
    ]);
    if (rows.affectedRows === 0) return { message: "Error al subir el episodeo" };
    return { id: rows.insertId, ...newEpisode, audio_secure_url, audio_public_id, img_secure_url, img_public_id };
};

export const getEpisodeByIdModel = async (id) => {
    const $sql = `SELECT episodes.*, users.name as host FROM episodes
                    JOIN podcasts ON episodes.podcast_id = podcasts.id
                    JOIN users ON users.id = podcasts.user_id WHERE episodes.id = ?`;
    const [rows, fields] = await pool.query($sql, [id]);
    return rows;
};

export const updateEpisodeModel = async (id, body) => {
    const $sql = `UPDATE episodes SET ? WHERE id = ?`;
    const [rows, fields] = await pool.query($sql, [body, id]);
    return rows;
};

export const deleteEpisodeModel = async (id) => {
    const $sql = `DELETE FROM episodes WHERE id = ?`;
    const [rows, fields] = await pool.query($sql, [id]);
    return rows;
};