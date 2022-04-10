import { body } from "express-validator";
import { validateRequest } from "./validate-request";

export const validateColis = [
    body("code").isString().withMessage("Colis code  must be valid"),
    body("addressEnlevement")
        .trim()
        .isString()
        .withMessage("Colis address Enlevement must be valid"),
    body("anomaly").trim().isString().withMessage("Colis anomaly must be valid"),
    body("addressLivraison")
        .trim()
        .isString()
        .withMessage("Colis address Livraison must be valid"),
    
    body("magasinier").isUUID("4").withMessage("Magasinier id must be valid"),
    body("driver").isUUID("4").withMessage("Driver id must be valid"),
    body("provider").isUUID("4").withMessage("provider id must be valid"),

    body("agenceExchange").isUUID("4").withMessage("agenceExchange id must be valid"),


    validateRequest,
];
