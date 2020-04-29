import express from "express";
import bodyParser from "body-parser";
import { initDb } from "./db";
import User from "./user";

initDb()
  .then(() => {
    const app = express();

    app.use(bodyParser.json());

    app.use("/access", User);

    app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
