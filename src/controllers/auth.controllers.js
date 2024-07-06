import { loginService, registerService } from "../services/auth.services.js";

export const login = async (req, res) => {
    try {
        const response = await loginService(req.body);
        if(response === "USER NOT FOUND") return res.status(401).json({message: "USER NOT FOUND"});
        if(response === "PASSWORD_INCORRECTO") return res.status(401).json({message: "INVALID CREDENTIALS"});
        res.cookie('token', response?.token, {
            httpOnly: true, // Asegúrate de que la cookie es HttpOnly
            secure: false, // Asegúrate de que la cookie es Secure si estás usando HTTPS
            sameSite: 'Lax', // Controla si la cookie se envía con solicitudes entre sitios
            maxAge: 3600000, // Tiempo de expiración de la cookie en milisegundos (1 hora en este ejemplo)
            path: '/'        // Ruta en la que la cookie está disponible
          });
        return res.status(200).json({message: "AUTHORIZED", user: response})
    } catch (error) {
        res.send("error en el login", error);
    }
};

export const register = async (req, res) => {
    const newUser = req.body;
    try {
        const response = await registerService(newUser);
        console.log(response);
        res.json({mesaage:"reister desde el controler", response});
    } catch (error) {
        res.send("error en el registro", error);
    }
};