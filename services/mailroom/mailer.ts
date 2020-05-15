import { createTransport } from "nodemailer";
import sendGrid from "nodemailer-sendgrid";

const transport = createTransport(
  sendGrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

export default transport.sendMail.bind(transport);
