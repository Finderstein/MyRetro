import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
	createdByName: { type: String, required: true },
	createdByEmail: { type: String, required: true },
	parentId: { type: String, required: true },
	columnIndex: { type: Number, required: true },
	text: { type: String, required: true },
	pin: { type: Boolean, required: true },
	likes: { type: Number, required: true },
});

const CardModel = mongoose.model("Card", CardSchema);

class Card {
	constructor(createdByName, createdByEmail, parentId, text) {
		this.createdByName = createdByName;
		this.createdByEmail = createdByEmail;
		this.parentId = parentId;
		this.columnIndex = 0;
		this.text = text;
		this.pin = false;
		this.likes = 0;
	}

	static getById(id) {
		return CardModel.findById({ _id: id });
	}

	static getAll() {
		return CardModel.find();
	}

	static getByParent(parentId) {
		return CardModel.find({ parentId: parentId });
	}

	static insert(card) {
		return new CardModel(card).save();
	}

	static update(card) {
		return CardModel.findByIdAndUpdate(card._id, card);
	}

	static delete(card) {
		return CardModel.findByIdAndDelete(card._id);
	}

	static deleteByParent(parentId) {
		return CardModel.deleteMany({ parentId: parentId });
	}
}

export default Card;
