import { body } from "express-validator";

export const validateUserData = [
  body("email").trim().isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password length must be > 6")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]/)
    .withMessage("Password must be strong"),
];

export const validateCategoryInput = [
  body("name").notEmpty().withMessage("category name is required"),
  body("description").isLength({ max: 120 }).withMessage("Description length should be < 120 char"),
];
