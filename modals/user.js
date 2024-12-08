const { mongoose } = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value))
                    throw new Error("Email is not valid")
            }
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            min: 0,
        },
        gender: {
            type: String,
            validate(value) {
                if (!["male", "female", "others"].includes(value)) {
                    throw new Error("Gender data is not valid")
                }
            }

        },
        about: {
            type: String,
            default: "I am about section"
        },
        photoUrl: {
            type: String,
            default: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
        },
        skills: [String]
    }, 
    
    { timestamps: true },
    

);

UserSchema.methods.generateJwt = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},"I@AM##POSSIBLE$!1999" , {expiresIn:"1d"})
    return token
}

UserSchema.methods.bcryptPass = async function(passwordSendByUser){
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordSendByUser,passwordHash);
    return isPasswordValid
}

UserSchema.methods.verifyJwt = async function(token){
    const decodedMessage = await jwt.verify(token,"I@AM##POSSIBLE$!1999");
    return decodedMessage
}

module.exports = mongoose.model("User", UserSchema);