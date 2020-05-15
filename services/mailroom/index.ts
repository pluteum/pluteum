import ampq from "amqplib";
import account from "./account";

ampq
  .connect(process.env.AMPQ_URL || "")
  .then((conn) => conn.createChannel())
  .then((channel) => {
    account(channel);
  });
