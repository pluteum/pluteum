import { Router } from "express";

import loginHandler from "./login";
import registrationHandler from "./registration";
import refreshHandler from "./refresh";

const User = Router();

User.get("/refresh", refreshHandler);
User.post("/login", loginHandler);
User.put("/register", registrationHandler);

export default User;
