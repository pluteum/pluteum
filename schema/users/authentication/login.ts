import bcrypt from "bcrypt";
import { select } from "sql-bricks";
import { Pool } from "pg";
import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_KEY || "";

async function generateToken(user: any) {
  return jwt.sign(user, JWT_KEY, { expiresIn: "1000" });
}

export default async function loginUser({ email, password }: any, pool: Pool) {
  const query = select().from("users").where({ email }).toParams();
  const user = await pool.query(query).then((result) => result.rows[0]);
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    delete user.password;

    return { token: await generateToken(user), user };
  }

  return {};
}
