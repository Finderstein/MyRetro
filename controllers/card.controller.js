import { StatusCodes } from "http-status-codes";
import Card from "../models/card.model.js";
import Comment from "../models/comment.model.js";

export async function getAll(req, res) {
	try {
		let cards = await Card.getAll();

		res.status(StatusCodes.OK).json({ cards });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}

export async function addCard(req, res) {
	const { createdByName, createdByEmail, parentId, text } = req.body;
	try {
		await Card.insert(
			new Card(createdByName, createdByEmail, parentId, text)
		);

		res.status(StatusCodes.OK).json({ message: "Success" });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}

export async function updateCard(req, res) {
	const { card } = req.body;

	try {
		const oldCard = await Card.getById(card._id);
		if (!oldCard) {
			res.status(StatusCodes.OK).json({ message: "Bad request" });
		}

		await Card.update(card);

		res.status(StatusCodes.OK).json({ message: "Success" });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}

export async function deleteCard(req, res) {
	const { id } = req.params;

	try {
		const delcard = await Card.getById(id);

		if (!delcard) {
			res.status(StatusCodes.OK).json({ message: "Bad request" });
		}

		await Card.delete(delcard);
		await Comment.deleteByParent(id);

		res.status(StatusCodes.OK).json({ message: "Success" });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}

export async function clearColumn(req, res) {
	const { parentId } = req.params;

	try {
		await Card.deleteByParent(parentId);

		res.status(StatusCodes.OK).json({ message: "Success" });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}
