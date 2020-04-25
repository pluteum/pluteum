import bcrypt from 'bcrypt';
import { insert, select } from 'sql-bricks';
import { Pool } from 'pg';

export default async function registerUser({firstName, lastName, email, password}: any, pool: Pool) {
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = insert('users', {firstName, lastName, email, password: hashedPassword}).toParams();

    query.text = `${query.text} RETURNING "id", "firstName", "lastName", "email"` // returning via postgres

    const result = await pool.query(query);
    
    return result.rows[0];
}