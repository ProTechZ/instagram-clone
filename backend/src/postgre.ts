import { Request, Response } from 'express';
import pg from 'pg';

const { PG_USER, PG_HOST, PG_DB, PG_PASSWORD, PG_PORT } = process.env;

const pool = new pg.Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DB,
  password: PG_PASSWORD,
  port: parseInt(PG_PORT!),
});

export const createUser = (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, password],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(400).send(err);
      }

      console.log(results);
      return res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
    
  );
};
