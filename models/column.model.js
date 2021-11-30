import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema({
	createdByName: { type: String, required: true },
	createdByEmail: { type: String, required: true },
	title: { type: String, required: true },
	color: { type: String, required: true },
});

const ColumnModel = mongoose.model("Column", ColumnSchema);

class Column {
	constructor(createdByName, createdByEmail, title, color) {
		this.createdByName = createdByName;
		this.createdByEmail = createdByEmail;
		this.title = title;
		this.color = color;
	}

	static getById(id) {
		return ColumnModel.findById({ _id: id });
	}

	static getAll() {
		return ColumnModel.find();
	}

	static insert(column) {
		return new ColumnModel(column).save();
	}

	static update(column) {
		return ColumnModel.findByIdAndUpdate(column._id, column);
	}

	static delete(column) {
		return ColumnModel.findByIdAndDelete(column._id);
	}
}

export default Column;
