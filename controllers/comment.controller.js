import { StatusCodes } from "http-status-codes";
import Comment from "../models/comment.model.js";

export async function getAll(req, res) {
	try {
		let comments = await Comment.getAll();

		res.status(StatusCodes.OK).json({ comments });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}

export async function addComment(req, res) {
	const { createdByName, createdByEmail, parentId, text } = req.body;
	try {
		await Comment.insert(
			new Comment(createdByName, createdByEmail, parentId, text)
		);

		res.status(StatusCodes.OK).json({ message: "Success" });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}

export async function updateComment(req, res) {
	const { comment } = req.body;

	try {
		const oldComment = await Comment.getById(comment._id);
		if (!oldComment) {
			res.status(StatusCodes.OK).json({ message: "Bad request" });
		}

		await Comment.update(comment);

		res.status(StatusCodes.OK).json({ message: "Success" });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}

export async function deleteComment(req, res) {
	const { id } = req.params;

	if (!id) {
		res.status(StatusCodes.OK).json({ message: "Bad request" });
	}

	try {
		const comment = await Comment.getById(id);

		if (!comment) {
			res.status(StatusCodes.OK).json({ message: "Bad request" });
		}

		await Comment.delete(comment);

		res.status(StatusCodes.OK).json({ message: "Success" });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}
