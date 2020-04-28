import express from "express";
import { Pool } from "pg";

const pool = new Pool();

pool
  .connect()
  .then((client) => {
    const app = express();
    app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
