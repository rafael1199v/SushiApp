import prisma from "../db.js"

export const createOrder = async (req, res) => {

    //console.log(req.user);
    console.log(req.body);

    res.sendStatus(201);
}