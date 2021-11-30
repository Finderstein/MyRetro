import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
	createdByName: { type: String, required: true },
	createdByEmail: { type: String, required: true },
	parentId: { type: String, required: true },
	text: { type: String, required: true },
});

const CommentModel = mongoose.model("Comment", CommentSchema);

class Comment {
	constructor(createdByName, createdByEmail, parentId, text) {
		this.createdByName = createdByName;
		this.createdByEmail = createdByEmail;
		this.parentId = parentId;
		this.text = text;
	}

	static getById(id) {
		return CommentModel.findById({ _id: id });
	}

	static getByParent(parentId) {
		return CommentModel.find({ parentId: parentId });
	}

	static getAll() {
		return CommentModel.find();
	}

	static insert(comment) {
		return new CommentModel(comment).save();
	}

	static update(comment) {
		return CommentModel.findByIdAndUpdate(comment._id, comment);
	}

	static delete(comment) {
		return CommentModel.findByIdAndDelete(comment._id);
	}

	static deleteByParent(parentId) {
		return CommentModel.deleteMany({ parentId: parentId });
	}
}

export default Comment;
