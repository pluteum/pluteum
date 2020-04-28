import express from "express";
import { initDb } from "./db";

initDb()
  .then(() => {
    const app = express();

    app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
