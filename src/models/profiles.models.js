import pool from "../db/config.js";

//TODO: consulta a la base de datos todos los usuarios
const getAll= async () => {
    const $sql = `SELECT * FROM profiles`;
    const [ rows, fields] = await pool.query($sql);
    return rows;
};

//TODO: consulta a la base de datos por ID
const getOne = async (id) => {
    const $sql = `SELECT * FROM profiles WHERE id_profile = ?`;
    const [ rows, fields]= await pool.query($sql, [id]);
    return rows[0];
};


//TODO: registro de fila en la base de datos
const insert = async (perfil) => {
    const $sql = `INSERT INTO profiles (name_profile, last_name_profile, birthdate_profile, about_profile, url_profile, owner_profile ) VALUES (?, ?, ?, ? ,?, ?)`;
    const values = [perfil.name, perfil.lastName, perfil.birthdate, perfil.about, perfil.url, perfil.owner]
    const response = await pool.query($sql, values)
    return response
};

//TODO: consulta a la base de datos para la eliminacion de un registro
const deleteOne = async (id) => {
    const $sql = `DELETE FROM profiles WHERE id_profile = ?`;
    const [response] = await pool.query($sql, [id]);
    return response;
};

//TODO: consulta para actualizar un resgistro
const updateOne = async (id, profile) => {
    const $sql = `UPDATE profiles SET ? WHERE id_profile = ?`;
    const response = await pool.query($sql, [profile, id]);
    console.log(response)
    return response;
};

export const ProfileModel = {
    getAll,
    getOne,
    insert,
    deleteOne,
    updateOne
}

