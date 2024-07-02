import { verifyToken } from "../libs/jwt.handle.js";

export const checkSession = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        /* console.log(token); */
        if(!token) return res.status(400).send("NO_AUTHORIZATION")
        const userJwt = await verifyToken(token);
        /* console.log(userJwt); */
        if(!userJwt){
            res.status(401).send("USER NOT ALLOWED");
        }else{
            req.user = userJwt;
            console.log(req.user)
            return next()
        }
    } catch (error) {
        return res.status(400).send("SESSION_NO_VALIDA")
    }
}