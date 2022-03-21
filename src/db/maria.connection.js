const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '164.92.133.72',
    user: 'admin',
    password: 'safe',
    database: 'lfnine_tickets',
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