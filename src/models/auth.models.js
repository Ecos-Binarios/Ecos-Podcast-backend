import pool from "../db/config.js";
import { verifyPassword } from '../libs/bcrypt.handle.js'


//TODO: consulta del modelo login al cual se le deberia pasar solo el email para saber si existe 
//FIX: cambiaria la funcion , pero asi funciona
const login = async ( email , password) => {
   const sql = "SELECT email, password FROM users WHERE email = ?";
   const values = [email];
   const [response] = await pool.query(sql, values);
   //OPTIMIZE: validacion si existe el mail mientras mas validaciones se agreguen mas sucio queda el modelo ! pero funiona
   if(response.length===0) return "USER NOT FOUND";
   //OPTIMIZE: recomiendo separarlo en un archivo en servicios para no mezclar las consultas con logica de negocio
   const passwordHash = response[0].password;
   const isVerify = await verifyPassword(password, passwordHash) 
   return isVerify;
}

const register = (newUser) => {
  
}


export const AuthModel = {
    login,
    register,
};