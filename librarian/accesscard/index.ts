import { Router } from "express";

import { setDb } from "./db";

import User from "./user";
import Library from "./library";
import { PoolClient } from "pg";

const AccessCard = Router();

export default function (pool: PoolClient): Router {
  setDb(pool);

  AccessCard.use("/user", User);
  AccessCard.use("/library", Library);

  return AccessCard;
}