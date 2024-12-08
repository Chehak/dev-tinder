const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, gender, email, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter strong password")

    }
    else if (!validator.isEmail(email)) {
        throw new Error("Please enter valid email")

    }
}

const validateProfileData = (req) => {
    const allowedFields = ["firstName", "lastName", "age", "photoUrl", "skills", "gender","about"];
    const isAllowed = Object.keys(req.body).every((field) => allowedFields.includes(field));
    return isAllowed;
}

module.exports = { validateSignUpData, validateProfileData }