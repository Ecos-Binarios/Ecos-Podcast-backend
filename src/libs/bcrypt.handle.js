import bcrypt from "bcryptjs";


//TODO: funcion asincrona para utilizar la libreria y su metodo hash que devuelve una promesa
export const encrypt = async (password) => {
   //OPTIMIZE: verificar si se puede colocar en variables de entorno
   const saltRound = 10
   try {
      const salt = await bcrypt.genSalt(saltRound);
      const passwordHash = await bcrypt.hash(password,  salt);
      return passwordHash;
   } catch (error) {
      console.log("there was an error encrypting the password", error)
      throw error
   }
};

//TODO: funcion asincrona para comparar la contraseña ingresada con la encriptada
 export const verifyPassword = (password, passwordHash) => {
   try {
       const match = bcrypt.compare(password, passwordHash);
       return match;
   } catch (error) {
      console.error('Error verificando la contraseña:', error);
      throw error;
   };
};