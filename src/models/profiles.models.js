import pool from "../db/config.js";

//TODO: consulta a la base de datos todos los usuarios
const getAll= async () => {
    try {
        const $sql = `SELECT * FROM profiles`;
        const [ rows, fields] = await pool.query($sql);
        return rows;
    } catch (error) {
        throw new Error("Error requesting all profiles in the database", error);
    }
};

//TODO: consulta a la base de datos por ID
const getOne = async (id) => {
    try {
        const $sql = `SELECT * FROM profiles WHERE id_profile = ?`;
        const [ rows, fields]= await pool.query($sql, [id]);
        return rows[0];
    } catch (error) {
        throw new Error("Error requesting one profile in the database", error);
    }
};

//TODO: registro de fila en la base de datos
const insert = async (perfil) => {
    try {
        const $sql = `INSERT INTO profiles (name_profile, last_name_profile, birthdate_profile, about_profile, url_profile, owner_profile ) VALUES (?, ?, ?, ? ,?, ?)`;
        const values = [perfil.name, perfil.lastName, perfil.birthdate, perfil.about, perfil.url, perfil.owner]
        const response = await pool.query($sql, values)
        return response
    } catch (error) {
        return error;
    }
};

//TODO: consulta a la base de datos para la eliminacion de un registro
const deleteOne = async (id) => {
    try {
        const $sql = `DELETE FROM profiles WHERE id_profile = ?`;
        const [response] = await pool.query($sql, [id]);
        return response;
    } catch (error) {
        return error;
    }
};

//TODO: consulta para actualizar un resgistro
const updateOne = async (id, profile) => {
    try {
        const $sql = `UPDATE profiles SET ? WHERE id_profile = ?`;
        const response = await pool.query($sql, [profile, id]);
        console.log(response)
        return response;
    } catch (error) {
        return error
    }
};

export const ProfileModel = {
    getAll,
    getOne,
    insert,
    deleteOne,
    updateOne
}

