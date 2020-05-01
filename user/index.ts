import { Router } from "express";

import loginHandler from "./login";
import registrationHandler from "./registration";

const User = Router();

User.post("/login", loginHandler);
// User.post("/refresh", refreshHandler);
User.put("/register", registrationHandler);

export default User;
