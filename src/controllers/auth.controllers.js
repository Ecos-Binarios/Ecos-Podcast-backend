import { machPassword } from "../services/auth.services.js";

export const login = async (req, res) => {
    try {
        const response = await machPassword(req.body);
        if(response === "USER NOT FOUND") return res.status(401).json({message: "USER NOT FOUND"});
        if(response === "PASSWORD_INCORRECTO") return res.status(401).json({message: "INVALID CREDENTIALS"});
        res.cookie('token', response.token);
        return res.status(200).json({message: "AUTHORIZED", user: response})
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