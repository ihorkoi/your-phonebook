import mongoose from "mongoose";
import Joi from "joi";

const schema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    number: {
        type: String,
        default: '',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { versionKey: false, timestamps: true });

export const addContactSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().min(6).max(64).required(),
})


export const Contact = mongoose.model('contact', schema);
