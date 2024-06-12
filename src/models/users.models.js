import pool from "../db/config.js";

export const getUsersSql = () => {
    const sqlUSers = `SELECT * FROM users`
    const response = pool.query(sqlUSers)
    return response;
}



