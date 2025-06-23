import express from "express";
import morgan from "morgan";
import cors from "cors";
import { protect } from './modules/auth.js';
import router from './router.js';
import { createNewUser, signin } from './handlers/user.js';
import { fileURLToPath } from "url";
import path from "path";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, '../.env')});

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../frontend')));

app.get(['/', '/menu', '/about', '/book', '/contact', '/blog', '/signup', '/login', '/cart'], (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.use("/api", protect, router);

app.post("/signup", createNewUser);
app.post("/signin", signin);

export default app;