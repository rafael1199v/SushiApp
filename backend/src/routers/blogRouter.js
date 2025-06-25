import { Router } from "express";
import { protect } from "../modules/auth.js";
import { getBlogs, likeBlog, unlikeBlog, updateBlog } from "../handlers/blog.js";
import toggleBlogValidator from "../validators/toggleBlogValidator.js";
import { handleUserInput } from "../middlewares/handleUserInput.js";
import blogUpdateValidator from "../validators/blogUpdateValidator.js";

const blogRouter = Router();

blogRouter.get("/", getBlogs);
blogRouter.put("/", protect, blogUpdateValidator, handleUserInput, updateBlog);
blogRouter.delete("/unlike/:id", protect, toggleBlogValidator, handleUserInput, unlikeBlog);
blogRouter.post("/like/:id", protect, toggleBlogValidator, handleUserInput, likeBlog);

export default blogRouter;