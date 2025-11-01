const express = require("express");
const { registration, login } = require("../controllers/authController");
const { createUserValidation, loginValidation } = require("../validations/userValidation");
const validate = require("../middlewares/validate");

const router = express.Router();

router.post("/register", createUserValidation, validate, registration);
router.post("/login", loginValidation, validate, login);
router.post("/change-password", login);



module.exports = router;