import mongoose from "mongoose";

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

export const User = mongoose.model('user', schema);
