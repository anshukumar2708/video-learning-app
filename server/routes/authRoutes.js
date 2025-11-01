const express = require("express");
const { body } = require("express-validator");
const { registration, login } = require("../controllers/authController");

const router = express.Router();

const createUserValidation = [
    body("name")
        .exists().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

    body("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Enter a valid email"),

    body("mobile")
        .exists().withMessage("Mobile number is required")
        .isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digits")
        .isNumeric().withMessage("Mobile number must contain only digits"),

    body("dob")
        .exists().withMessage("Date of birth is required")
        .isDate().withMessage("Date of birth must be a valid date"),

    body("role")
        .exists().withMessage("Role is required")
        .isIn(["student", "creator", "admin"]).withMessage("Role must be student, creator, admin"),

    body("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 6, max: 15 }).withMessage("Password must be between 6 to 15 characters"),

    body("confirmPassword")
        .exists().withMessage("Confirm password is required")
        .isLength({ min: 6, max: 15 }).withMessage("Confirm password must be between 6 to 15 characters")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password & confirm password must be match")
            }
            return true;
        })
];


router.post("/register", createUserValidation, registration);
router.post("/login", login);
router.post("/change-password", login);



module.exports = router;