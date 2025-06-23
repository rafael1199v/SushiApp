import { Router } from "express";
import { protect } from "../modules/auth.js";
import { getProducts } from "../handlers/product.js";

const productRouter = Router();

productRouter.get("/", getProducts);

export default productRouter;