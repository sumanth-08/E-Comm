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

export const validateProductInput = [
  body("name").notEmpty().withMessage("product name is required"),
  body("description").isLength({ max: 120 }).withMessage("Description length should be < 120 char"),
  body("price").notEmpty().withMessage("Price is required").isFloat({ min: 1 }).withMessage("Amount must be postive number"),
  body("stock").notEmpty().withMessage("Stock is required").isInt({ min: 0, max: 1 }).withMessage("Stcok must be 0 or 1"),
  body("categoryId").notEmpty().withMessage("Category id is required"),
];
