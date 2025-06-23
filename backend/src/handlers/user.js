import prisma from "../db.js";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth.js";

export const createNewUser = async (req, res) => {
    //const hash = await hashPassword(req.body.password);
    //console.log(hash);
    console.log(req.body);
    res.sendStatus(200);
}

export const signin = async (req, res) => {
    console.log(req.body)
    res.sendStatus(200);
}