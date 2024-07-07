import jwt from "jsonwebtoken";
import 'dotenv/config';


const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
  const tokenJwt = new Promise((resolve, reject) => {
    jwt.sign({ user: user }, JWT_SECRET, { 
        expiresIn: "1h" }, (err, token) => {
        if(err) reject(err);
        resolve(token);
    });
  });

  return tokenJwt;
};

export const verifyToken = async (token) => {
  const userJwt = new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) reject(err)
        resolve(user)
    })
   })
   return userJwt;
};
