import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const jwtSalt = process.env.JWTSECRET || "SecretJWTSalt123!@$";
const saltRounds = 10;

export async function register(req, res) {
	const { firstname, lastname, email, password } = req.body;

	try {
		const passwordHash = await bcrypt.hash(password, saltRounds);
		await User.insert(new User(firstname, lastname, email, passwordHash));

		res.status(StatusCodes.OK).json({
			message: "Profile created successfully",
		});
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Internal server error",
		});
	}
}

export async function login(req, res) {
	const { email, password } = req.body;

	try {
		const user = await User.getByEmail(email);
		if (!user) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "Cannot find user with this email" });
		}

		const passwordIsValid = await bcrypt.compare(password, user.password);
		if (!passwordIsValid) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "Bad request" });
		}

		const token = jwt.sign({ id: user.id }, jwtSalt, {
			expiresIn: 86400, // 24 hours
		});

		res.status(StatusCodes.OK).json({
			jwt_token: token,
			user,
		});
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
			message: err.message,
		});
	}
}

export function checkDuplicateEmail(req, res, next) {
	const { email } = req.body;

	// Check if user with this username exist
	User.getByEmail(email)
		.then((user) => {
			if (user) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: "User with this email already exist",
				});
			}

			next();
		})
		.catch(() => {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Internal server error",
			});
		});
}
