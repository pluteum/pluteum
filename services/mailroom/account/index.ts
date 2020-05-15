import { ConsumeMessage, Channel } from "amqplib";
import { readFileSync } from "fs-extra";
import mustache from "mustache";
import sendMail from "../mailer";

const FORGOT_TEMPLATE = readFileSync(
  "account/templates/forgot.template.html"
).toString();

export function onAccountMessage(msg: ConsumeMessage | null, channel: Channel) {
  if (msg) {
    try {
      const { type, to, content } = JSON.parse(msg.content.toString());

      let subject, html;

      switch (type) {
        case "FORGOT_PASSWORD":
          subject = "Forgot your password?";
          html = mustache.render(FORGOT_TEMPLATE, content);
          break;

        default:
          break;
      }

      const message = {
        from: "Pluteum <hello@pluteum.io>",
        to,
        subject,
        html,
      };

      sendMail(message, (error) => {
        if (error) {
          channel.nack(msg);
        }

        channel.ack(msg);
      });
    } catch (e) {
      if (e instanceof SyntaxError) {
        channel.nack(msg);
      }
    }
  }
}

export default (channel: Channel) =>
  channel.consume("mailroom_account", (msg) => onAccountMessage(msg, channel));
