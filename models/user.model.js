import mongoose from "mongoose";

const UserShema = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		createdDate: { type: String, required: true },
	},
	{ versionKey: false }
);

const UserModel = mongoose.model("User", UserShema);

class User {
	constructor(firstname, lastname, email, password) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
		this.createdDate = Date.now().toString();
	}

	static insert(user) {
		return new UserModel(user).save();
	}

	static getById(id) {
		return UserModel.findById({ _id: id });
	}

	static getByEmail(email) {
		return UserModel.findOne({ email: email });
	}

	static updateUser(user) {
		return UserModel.findByIdAndUpdate(user._id, user);
	}

	static delete(id) {
		return UserModel.findByIdAndDelete(id);
	}
}

export default User;
