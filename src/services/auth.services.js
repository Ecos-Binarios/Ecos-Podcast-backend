import { encrypt, verifyPassword } from '../libs/bcrypt.handle.js'
import { generateToken } from '../libs/jwt.handle.js';
import { AuthModel } from '../models/auth.models.js';
import { ProfileModel } from '../models/profiles.models.js';
import { UsersModel } from '../models/users.models.js';

export const loginService = async (user) => {
   const {email, password} = user
   try {
    const response = await AuthModel.login(email);
    console.log(response)
    //OPTIMIZE: validacion si existe el mail mientras mas validaciones se agreguen mas sucio queda el modelo ! pero funiona
     if(response.length === 0) return "USER NOT FOUND";
    //OPTIMIZE: recomiendo separarlo en un archivo en servicios para no mezclar las consultas con logica de negocio
    const passwordHash = response[0].password;
    const isVerify = await verifyPassword(password, passwordHash);
      if(!isVerify) return "PASSWORD_INCORRECTO"
     const jwtCreate = await generateToken(user);
     const data = {
         token: jwtCreate,
         name: response[0].name,
         email: response[0].email,
         rol: response[0].rol_user,
         state: response[0].state_user,
     };
    return data;
   } catch (error) {
    return console.error(error);
   }
};



export const registerService = async (user) => {
  const {name, email, password} = user
 try {
  const checkUser = await UsersModel.checkEmail(email);
  console.log(checkUser)
  const passwordHash = await encrypt(password);
  const response = await AuthModel.register(name, email, passwordHash);
  /* console.log(response.insertId) */
   const profile = {
    name: name,
    lastName: user.lastName,
    birthdate: null,
    about: "",
    url: "",
    owner: response.insertId
   }
  const ver = await ProfileModel.insert(profile);
  console.log(ver)
  return response
 } catch (error) {
  
 }
}