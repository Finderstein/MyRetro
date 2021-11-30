import { StatusCodes } from "http-status-codes";
import Card from "../models/card.model.js";
import Column from "../models/column.model.js";
import Comment from "../models/comment.model.js";

export async function getAll(req, res) {
	try {
		let columns = await Column.getAll();

		res.status(StatusCodes.OK).json({ columns });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}

export async function addColumn(req, res) {
	const { createdByName, createdByEmail, title, color } = req.body;

	try {
		await Column.insert(
			new Column(createdByName, createdByEmail, title, color)
		);

		res.status(StatusCodes.OK).json({ message: "Success" });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}

export async function updateColumn(req, res) {
	const { column } = req.body;

	try {
		const oldColumn = await Column.getById(column._id);
		if (!oldColumn) {
			res.status(StatusCodes.OK).json({ message: "Bad request" });
		}

		await Column.update(column);

		res.status(StatusCodes.OK).json({ message: "Success" });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}

export async function deleteColumn(req, res) {
	const { id } = req.params;

	if (!id) {
		res.status(StatusCodes.OK).json({ message: "Bad request" });
	}

	try {
		const column = await Column.getById(id);

		if (!column) {
			res.status(StatusCodes.OK).json({ message: "Bad request" });
		}

		await Column.delete(column);
		const cards = await Card.getByParent(id);
		await Card.deleteByParent(id);
		for (const card of cards) {
			await Comment.deleteByParent(card._id);
		}

		res.status(StatusCodes.OK).json({ message: "Success" });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}
