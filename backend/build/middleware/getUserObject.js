import pool from '../configs/postgres.config.js';
const getUserObject = (userId) => {
    const list = [];
    pool.query('SELECT * FROM users WHERE user_id = $1', [userId], (err, results) => {
        if (err) {
            return null;
        }
        else if (results.rows.length <= 0) {
            return null;
        }
        else {
            const user = results.rows[0];
            list.push(user);
        }
    });
    return list[0];
};
export default getUserObject;
