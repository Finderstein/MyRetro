import express from "express";
import {
	checkDuplicateEmail,
	register,
	login,
} from "../controllers/auth.controller.js";

const router = new express.Router();

router.post("/register", [checkDuplicateEmail], register);
router.post("/login", login);

export default router;
