const { validationResult } = require("express-validator");

const validate = (req, res, next) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {
        const formattedError = error.array().map((error) => ({
            field: error.path,
            message: error.msg
        }))
        return res.status(400).json({ status: "error", error: formattedError });
    }

    next();
}


module.exports = validate;