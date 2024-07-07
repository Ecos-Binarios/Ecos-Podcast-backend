import pool from "../db/config.js";
import { encrypt } from "../libs/bcrypt.handle.js";

//TODO: consulta a la base de datos todos los usuarios
const getAll= async () => {
    try {
        const $sql = `SELECT id, name, email FROM users`;
        const [ rows, fields] = await pool.query($sql);
        return rows;
    } catch (error) {
        throw new Error("Error requesting all users in the database", error);
    }
};

//TODO: consulta a la base de datos por ID
const getOne = async (id) => {
    try {
        const $sql = `SELECT id, name, email FROM users WHERE id = ?`;
        const [ rows, fields]= await pool.query($sql, [id]);
        return rows[0];
    } catch (error) {
        throw new Error("Error when requesting a user in the database", error);
    }
};

//TODO: consulta a la base de datos por mail
const checkEmail = async (email) => {
    try {
        const $sql = `SELECT * FROM users WHERE email = ?`;
        const [rows, fields] = await pool.query($sql, [email]);
        return rows;
    } catch (error) {
        throw new Error("Error checking email in database", error)
    }
};

//TODO: registro de fila en la base de datos
const insert = async (name , email, password) => {
    try {
        const $sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        //OPTIMIZE: encript de password funcion que viene de libs/bcrypt.handle.js
        const passwordHash = await encrypt(password);
        const response = await pool.query($sql, [name, email, passwordHash])
        return response
    } catch (error) {
        throw new Error("Error registering user in database", error)
    }
};

//TODO: consulta a la base de datos para la eliminacion de un registro
const deleteOne = async (id) => {
    try {
        const $sql = `DELETE FROM users WHERE id = ?`;
        const [response] = await pool.query($sql, [id]);
        return response;
    } catch (error) {
        throw new Error("Error deleting user in database", error)
    }
};

//TODO: consulta para actualizar un resgistro
const updateOne = async (id, updateUser) => {
    try {
        const {name, email} = updateUser;
        const $sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
        const response = await pool.query($sql, [name, email, id]);
        console.log(response)
        return response;
    } catch (error) {
        throw new Error("Error updating user in database", error)
    }
};

export const UsersModel = {
    getAll,
    getOne,
    insert,
    checkEmail,
    deleteOne,
    updateOne
}

