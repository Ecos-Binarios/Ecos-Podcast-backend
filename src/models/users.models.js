import pool from "../db/config.js";
import { encrypt } from "../libs/bcrypt.handle.js";

//TODO: consulta a la base de datos todos los usuarios
const getAll= async () => {
    const $sql = `SELECT id, name, email FROM users`;
    const [ rows, fields] = await pool.query($sql);
    return rows;
};

//TODO: consulta a la base de datos por ID
const getOne = async (id) => {
    const $sql = `SELECT id, name, email FROM users WHERE id = ?`;
    const [ rows, fields]= await pool.query($sql, [id]);
    return rows[0];
};

//TODO: consulta a la base de datos por mail
const checkEmail = async (email) => {
    const $sql = `SELECT * FROM users WHERE email = ?`;
    const [rows, fields] = await pool.query($sql, [email]);
    return rows;
};

//TODO: registro de fila en la base de datos
const insert = async (name , email, password) => {
    const $sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    //OPTIMIZE: encript de password funcion que viene de libs/bcrypt.handle.js
    const passwordHash = await encrypt(password);
    const response = await pool.query($sql, [name, email, passwordHash])
    return response
};

//TODO: consulta a la base de datos para la eliminacion de un registro
const deleteOne = async (id) => {
    const $sql = `DELETE FROM users WHERE id = ?`;
    const [response] = await pool.query($sql, [id]);
    return response;
};

//TODO: consulta para actualizar un resgistro
const updateOne = async (id, updateUser) => {
    const {name, email} = updateUser;
    const $sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    const response = await pool.query($sql, [name, email, id]);
    console.log(response)
    return response;
};

export const UsersModel = {
    getAll,
    getOne,
    insert,
    checkEmail,
    deleteOne,
    updateOne
}

