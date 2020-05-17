import debug from "debug";
import { select } from "sql-bricks";
import { generateResetToken } from "./token";
import { PoolClient } from "pg";
import { Channel } from "amqplib";

const forgotDebug = debug("pluteum:accesscard:forgot");
const JWT_KEY = process.env.JWT_KEY || "default";

export default async function forgot(
  email: string,
  pool: PoolClient,
  channel: Channel
) {
  // Validate request
  if (email) {
    forgotDebug(`Received password reset request for ${email}`);
    const query = select("uuid").from("users").where({ email }).toParams();

    const user = await pool.query(query).then((result) => result.rows[0]);

    if (user) {
      forgotDebug(
        `Found user for ${email} with UUID ${user.uuid}, generating token.`
      );

      const token = await generateResetToken(user, pool);

      const mail = {
        type: "FORGOT_PASSWORD",
        to: email,
        content: {
          link: `${process.env.URL}/reset-password?token=${token}`,
        },
      };

      return channel.sendToQueue(
        "mailroom_account",
        Buffer.from(JSON.stringify(mail))
      );
    }
  }

  return false;
}
