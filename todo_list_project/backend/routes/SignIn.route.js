import express from "express";

import { signIn} from "../controllers/SignIn.controller.js";

const router = express.Router();

router.get("/", signIn);

export default router;