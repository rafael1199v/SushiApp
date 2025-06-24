import { Router } from "express";
import { protect } from "../modules/auth.js";
import { getBlogs } from "../handlers/blog.js";

const blogRouter = Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/", protect,() => {});

blogRouter.get("/:id", protect, () => {});
blogRouter.put("/:id", protect, () => {});
blogRouter.delete("/:id", protect, () => {});

export default blogRouter;