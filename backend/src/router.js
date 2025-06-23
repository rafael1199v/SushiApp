import { Router } from "express";
import { body, validationResult } from "express-validator";

const router = Router();

router.get("/blog", () => {});
router.post("/blog", () => {});

router.get("/blog/:id", () => {});
router.put("/blog/:id", () => {});
router.delete("/blog/:id", () => {});

export default router;

