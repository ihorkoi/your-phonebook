import mongoose from "mongoose";
import Joi from "joi";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const schema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: '',
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        default: '',
        required: [true, "Password is required"],
    },
    token: {
        type: String,
        default: ''
    },
}, { versionKey: false, timestamps: true });

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).max(64).required(),
})

export const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).max(64).required()
})

export const User = mongoose.model('user', schema);
