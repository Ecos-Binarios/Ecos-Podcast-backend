import { getUsersSql } from "../models/users.models.js";

export const getUsers = async (req, res) => {
    try {
        //const response = getUsersSql();
        res.send("users");
    } catch (error) {
        res.send({message: error})
    }
}

export const getUser = (req, res) => {
    res.sed("un solo usuario")
}