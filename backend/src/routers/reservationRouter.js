import { Router } from "express";
import { protect } from "../modules/auth.js";
import publicReservationValidator from "../validators/publicReservationValidator.js";
import privateReservationValidator from "../validators/privateReservationValidator.js";
import { handleUserInput } from "../middlewares/handleUserInput.js";

const reservationRouter = Router();

reservationRouter.post("/public", publicReservationValidator, handleUserInput, () => {});
reservationRouter.post("/", protect, privateReservationValidator, handleUserInput, () => {});

export default reservationRouter;