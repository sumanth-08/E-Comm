import { body } from "express-validator";

export const validateUserData = [
  body("email").trim().isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password length must be > 6")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]/)
    .withMessage("Password must be strong"),
];
