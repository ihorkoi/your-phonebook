import jwt from "jsonwebtoken";
import { User } from "../models/Users.js";
import { HttpError } from "../helpers/HttpError.js";

const { JWT_PRIVATE_KEY } = process.env;

export const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401))
    }
    try {
        const { id } = jwt.verify(token, JWT_PRIVATE_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            next(HttpError(401));
        }
        req.user = user
        next();

    } catch {
        next(HttpError(401));
    }
}

