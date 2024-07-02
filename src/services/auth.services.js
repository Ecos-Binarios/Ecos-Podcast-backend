import { verifyPassword } from '../libs/bcrypt.handle.js'
import { generateToken } from '../libs/jwt.handle.js';
import { AuthModel } from '../models/auth.models.js';

export const machPassword = async (user) => {
   const {email, password} = user
   try {
    const response = await AuthModel.login(email);
    console.log(response)
    //OPTIMIZE: validacion si existe el mail mientras mas validaciones se agreguen mas sucio queda el modelo ! pero funiona
     if(response.length === 0) return "USER NOT FOUND";
    //OPTIMIZE: recomiendo separarlo en un archivo en servicios para no mezclar las consultas con logica de negocio
    const passwordHash = response.password;
    const isVerify = await verifyPassword(password, passwordHash);
      if(!isVerify) return "PASSWORD_INCORRECTO"
     const jwtCreate = await generateToken(user);
     const data = {
         token: jwtCreate,
         name: response.name,
         email: response.email,
         rol: response.rol_user,
         state: response.state_user,
     };
    return data;
   } catch (error) {
    return console.error(error);
   }
};