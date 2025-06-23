import { Router } from "express";
import blogRouter from "./routers/blogRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

const router = Router();

router.use("/blog", blogRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);

export default router;

