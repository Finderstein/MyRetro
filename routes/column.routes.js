import express from "express";
import {
	getAll,
	addColumn,
	updateColumn,
	deleteColumn,
} from "../controllers/column.controller.js";

const router = new express.Router();

router.get("/", getAll);
router.post("/", addColumn);
router.put("/", updateColumn);
router.delete("/:id", deleteColumn);

export default router;
