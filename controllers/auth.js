import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/Users.js";
import { HttpError } from "../helpers/HttpError.js";
import 'dotenv/config'

const { JWT_PRIVATE_KEY } = process.env;

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email already in use");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ ...req.body, name, password: hashPassword });

        const payload = {
            id: newUser._id,
        };
        const token = jwt.sign(payload, JWT_PRIVATE_KEY, { expiresIn: "23h" });
        await User.findByIdAndUpdate(newUser._id, { token });

        res.status(201).json({
            token,
            email: newUser.email,
            name: newUser.name
        })
    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password invalid");
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw HttpError(401, "Email or password invalid");
        }
        const payload = {
            id: user._id,
        };
        const token = jwt.sign(payload, JWT_PRIVATE_KEY, { expiresIn: "23h" });
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { token },
            { new: true }
        );
        res.json({
            token,
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
            },
        })
    } catch (error) {
        next(error)
    }
};


const getCurrent = async (req, res) => {
    const { _id, email, name } =
        req.user;

    res.json({
        _id,
        email,
        name,
    });
};

const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: "" });

        res.status(204).json({
            message: "Logout success",
        })
    } catch (error) {
        next(error)
    }
};

const updateById = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
        if (!result) {
            throw HttpError(404, `User with id=${_id} not found`);
        }

        res.json(result)
    } catch (error) {
        next(error)
    }
};

export default {
    register,
    login,
    getCurrent,
    logout,
    updateById
};