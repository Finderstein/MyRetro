import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import columnRouter from "./routes/column.routes.js";
import cardRouter from "./routes/card.routes.js";
import commentsRouter from "./routes/comment.routes.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

const __dirname = path.resolve(path.dirname(""));

app.use(express.static(__dirname + "/public"));

// simple route
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public/index.html"));
});

// routes
app.use("/api/auth", authRouter);
app.use("/api/column", columnRouter);
app.use("/api/card", cardRouter);
app.use("/api/comment", commentsRouter);

const reservePORT = 8080; // Removing warning from eslint
const PORT = process.env.PORT || reservePORT;
const databaseUrl = process.env.DB;

mongoose
	.connect(databaseUrl, { useNewUrlParser: true })
	.then(() => console.log(`Database connected!`))
	.then(() =>
		app.listen(PORT, () => {
			console.log(
				`Server is ready on port ${PORT}.`,
				`http://localhost:${PORT}/`
			);
		})
	)
	.catch((err) => console.log(`Start error ${err}`));
