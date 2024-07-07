import pool from "../db/config.js";


export const getAllCategoriesModel = async () => {
    const $sql = `SELECT * FROM categories`;
    const [rows, fields] = await pool.query($sql);
    return rows; 
}

export const getCategoriesByPodcastIdModel = async (podcastId) => {
    const $sql = `SELECT categories.name, categories.id as category_id FROM categories
       JOIN podcast_categories ON podcast_categories.category_id = categories.id
       WHERE podcast_categories.podcast_id = ?`;
    const [rows, fields] = await pool.query($sql, [podcastId]);
    return rows;
}

export const createCategoryModel = async (newCategory) => {
    const { name } = newCategory;
    const $sql = `INSERT INTO categories (name) VALUES (?)`;
    const [rows, fields] = await pool.query($sql, [name]);
    return rows;
}

export const createPodcastCategoryModel = async (podcastId, categoryId) => {
    const $sql = `INSERT INTO podcast_categories (podcast_id, category_id) VALUES (?, ?)`;
    const [rows, fields] = await pool.query($sql, [podcastId, categoryId]);
    return rows;
}

