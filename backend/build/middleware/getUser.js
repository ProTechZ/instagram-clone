import pool from '../configs/postgres.config.js';
const getUserObject = (userId) => {
    pool.query('SELECT * FROM users WHERE user_id = $1', [userId], (err, results) => {
        if (err) {
            return null;
        }
        else if (results.rows.length <= 0) {
            return null;
        }
        const user = results.rows[0];
        return user;
    });
};
export default getUserObject;
