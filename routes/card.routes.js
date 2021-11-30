import express from "express";
import {
	getAll,
	addCard,
	updateCard,
	deleteCard,
	clearColumn,
} from "../controllers/card.controller.js";

const router = new express.Router();

router.get("/", getAll);
router.post("/", addCard);
router.put("/", updateCard);
router.delete("/:id", deleteCard);
router.delete("/clearColumn/:parentId", clearColumn);

export default router;
