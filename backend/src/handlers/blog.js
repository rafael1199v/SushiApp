import prisma from "../db.js";
import jwt from "jsonwebtoken"

export const getBlogs = async (req, res) => {
    const bearer = req.headers.authorization;
   
    let payload = null;

    if(bearer && bearer.split(" ")[1]) {
        const token = bearer.split(" ")[1];
        payload = jwt.verify(token, process.env.JWT_SECRET);
    }

    const userId = payload?.id ?? -1;

    let blogs = await prisma.blog.findMany({
        include: {
            favoriteBlogs: {
                where: {
                    userId: userId
                }
            }
        }
    });


    blogs = blogs.map(blog => {
        return {
            ...blog,
            favorite: blog.favoriteBlogs.length !== 0
        }
    })

    res.json(blogs);
}