import { UsersModel } from "../models/users.models.js";

export const getUsers = async (_, res) => {
    try {
        const response = await UsersModel.getAll();
        return res.status(200).json(response);
    } catch (error) {
        return console.log(error)
    }
};

export const getUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const response = await UsersModel.getOne(id);
        return res.status(200).json(response);
    } catch (error) {
        return console.log(error);
    }
};

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        //TODO: verificacion del email con una consulta en el modelo
        const checkEmail = await UsersModel.checkEmail(email);
        if(checkEmail.length !== 0) return res.status(409).json({message: "the email is already in use"});
        //TODO: si no existe se continua con el insert en la base de datos
        const response = await UsersModel.insert(name, email, password);
        return res.status(200).json(response);
    } catch (error) {
        return console.log(error);
    }
};

export const deleteUser = async ( req, res) => {
    const id = req.params.id;
    try {
        const response = await UsersModel.deleteOne(id);
        if(response.affectedRows === 0) return res.status(404).json({message: "USER NOT FOUND"})
        console.log(response)
        return res.status(200).json({message: "USER DELETE"})  
    } catch (error) {
        res.send(error)
    }
}

export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const updateUser = req.body;
    try {
        const response = await UsersModel.updateOne(id, updateUser);
        return res.status(200).json(response);
    } catch (error) {
        console.log("DATA BASE QUERY ERROR", error);
        return res.status(500).send("DATA BASE QUERY ERROR");
    }
}