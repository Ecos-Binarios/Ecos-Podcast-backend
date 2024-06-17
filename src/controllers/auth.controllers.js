import { AuthModel } from "../models/auth.models.js";

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const response = await AuthModel.login(email, password);
        if(response === "USER NOT FOUND") return res.status(401).json({message: "USER NOT FOUND"});
        if(!response) return res.status(401).json({message: "INVALID CREDENTIALS"});
        return res.status(200).json({message: "AUTHORIZED"})
    } catch (error) {
        res.send("error en el login", error);
    }
};

export const register = async (req, res) => {
    const newUser = req.body;
    try {
        res.send("reister desde el controler");
    } catch (error) {
        res.send("error en el registro", error);
    }
};