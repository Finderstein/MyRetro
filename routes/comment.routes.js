import express from "express";
import {
	getAll,
	addComment,
	updateComment,
	deleteComment,
} from "../controllers/comment.controller.js";

const router = new express.Router();

router.get("/", getAll);
router.post("/", addComment);
router.put("/", updateComment);
router.delete("/:id", deleteComment);

export default router;
