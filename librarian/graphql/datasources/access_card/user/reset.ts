import debug from "debug";
import { verify, decode } from "jsonwebtoken";
import { select, update } from "sql-bricks";
import { PoolClient } from "pg";
import bcrypt from "bcrypt";
import loginUser from "./login";

const resetDebug = debug("pluteum:accesscard:reset");
const JWT_KEY = process.env.JWT_KEY || "default";

export default async function reset(
  token: string,
  password: string,
  pool: PoolClient
) {
  const { jti, uuid } = verify(token, JWT_KEY) as { jti: string; uuid: string };
  // Validate request
  if (jti && uuid) {
    resetDebug(`Received password reset for ${uuid}`);

    const query = select("email, uuid")
      .from("users")
      .where({ uuid, resetToken: jti })
      .toParams();

    const user = await pool.query(query).then((result) => result.rows[0]);

    if (user) {
      resetDebug(`Found user for with UUID ${user.uuid}.`);

      const hashedPassword = await bcrypt.hash(password, 10);

      const updateQuery = update("users", {
        password: hashedPassword,
        resetToken: null,
      })
        .where({ uuid })
        .toParams();

      await pool.query(updateQuery).then((result) => result.rows[0]);

      resetDebug(`Sucessfully reset the password for ${uuid}`);

      return loginUser({ email: user.email, password }, pool);
    }
  }

  throw "Invalid Request";
}
