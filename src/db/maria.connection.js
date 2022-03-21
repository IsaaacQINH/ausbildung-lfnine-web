const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'UTF8MB4'
});

const query = async (q = "") => {
    let conn;
    try {
        // Create a new connection
        conn = await pool.getConnection();
        return await conn.query(q);
        
    } catch (err) {
        // Print error
        console.log(err);
    } finally {
        // Close connection
        if (conn) await conn.close();
    }
}

module.exports = {
    query,

};