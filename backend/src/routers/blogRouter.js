import { Router } from "express";
import { protect } from "../modules/auth.js";

const blogRouter = Router();

blogRouter.get("/", () => {});
blogRouter.post("/", protect,() => {});

blogRouter.get("/:id", protect, () => {});
blogRouter.put("/:id", protect, () => {});
blogRouter.delete("/:id", protect, () => {});

export default blogRouter;