import { body } from "express-validator";


const privateReservationValidator = [
    body("guests")
        .notEmpty()
        .withMessage("Se deben tener invitados")
        .isNumeric()
        .withMessage("El numero de invitados es invalido"),

    body("date")
        .notEmpty()
        .withMessage("Se necesita una fecha")
        .isDate()
        .withMessage("La fecha es invalida"),

    body("time")
        .notEmpty()
        .withMessage("La hora es requerida")
        .isTime()
        .withMessage("Formato de la hora invalido")
];


export default privateReservationValidator;