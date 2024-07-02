import pool from "../db/config.js";


//TODO: consulta del modelo login al cual se le deberia pasar solo el email para saber si existe 
//FIX: cambiaria la funcion , pero asi funciona
const login = async (email) => {
   const sql = "SELECT * FROM users WHERE email = ?";
   const values = [email];
   const [response ]= await pool.query(sql, values);
   return response[0];
}

const register = (newUser) => {
  
}


export const AuthModel = {
    login,
    register,
};