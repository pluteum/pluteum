import express from "express";
import bodyParser from "body-parser";
import { initDb } from "./db";
import User from "./user";
import Library from "./library";

initDb()
  .then(() => {
    const app = express();

    app.use(bodyParser.json());

    app.use("/user", User);
    app.use("/library", Library);

    app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
