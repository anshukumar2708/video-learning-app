
const { validationResult } = require("express-validator");
const User = require("../models/userModel");

exports.registration = async (req, res) => {
    try {
        const { confirmPassword, ...newUserData } = req?.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const formattedError = errors.array().map((err) => ({
                field: err.path,
                message: err.msg,
            }))
            return res.status(400).json({ status: "error", errors: formattedError });
        }

        const user = await User.create(newUserData);

        const token = user.generateAuthToken();

        // convert userData in object and then delete
        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({
            status: "success",
            message: "Registration successfully",
            data: { ...userData, token },
        });
    } catch (error) {
        res.status(400).json({ status: "error", data: error });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Invalid Credentials",
            });
        }

        // Pass password in string not in number during password compare
        const isMatched = await user.comparePassword(password.toString());

        if (!isMatched) {
            return res.status(400).json({ status: "error", message: "Invalid Credentials" });
        }

        const token = user.generateAuthToken();

        // convert userData in object and then delete
        const userData = user?.toObject();
        delete userData.password;

        res.status(200).json({
            status: "success",
            message: "Login successfully",
            data: { ...userData, token },
        });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};


// exports.changePassword = async(req, res) = {
//     const { oldPassword, new}
// }
