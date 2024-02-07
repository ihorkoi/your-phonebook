import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    pnone: {
        type: String,
        default: '',
        required: [true, "Email is required"],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { versionKey: false, timestamps: true });

export const Contact = mongoose.model('contact', schema);
