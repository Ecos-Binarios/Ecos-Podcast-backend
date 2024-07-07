import { loginService, registerService } from "../services/auth.services.js";

export const login = async (req, res) => {
    try {
        const response = await loginService(req.body);
        if(response === "USER NOT FOUND") return res.status(401).json({data: response});
        if(response === "PASSWORD_INCORRECTO") return res.status(401).json({data: response});
        res.cookie('token', response?.token, {
            httpOnly: true, // Asegúrate de que la cookie es HttpOnly
            secure: false, // Asegúrate de que la cookie es Secure si estás usando HTTPS
            sameSite: 'Lax', // Controla si la cookie se envía con solicitudes entre sitios
            maxAge: 3600000, // Tiempo de expiración de la cookie en milisegundos (1 hora en este ejemplo)
            path: '/'        // Ruta en la que la cookie está disponible
        });
        return res.status(200).json({message: "ok", data: response});
    } catch (error) {
        res.send("error en el login", error);
    }
};

export const register = async (req, res) => {
    const newUser = req.body;
    try {
        const response = await registerService(newUser);
        if(response === "EMAIL IS IN USE") return res.status(409).json({data: response});
        if(response === "UNREGISTER USER") return res.status(509).json({data: response});
        if(response === "ERROR PROFILE NOT CREATED") return res.status(509).json({data: response});
        res.status(201).json({message: "ok", data: response});
    } catch (error) {
        res.status(400).json({message: "error en el registro", error});
    }
};