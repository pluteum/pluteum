import { Router } from "express";
import createHandler from "./create";
import fetchHandler from "./fetch";

const Library = Router();

Library.get(":id", fetchHandler);
// Library.post("/", updateHandler);
Library.put("/", createHandler);

export default Library;
