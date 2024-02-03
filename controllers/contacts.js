import Contact from "../models/Contact.js";

import { HttpError } from "../helpers/HttpError.js";

const addContact = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const result = await Contact.create({ ...req.body, owner });

        res.status(201).json(result)
    }
    catch (error) {
        next(error)
    }
};

const editContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }

        res.json(result)
    } catch (error) {
        next(error)
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOneAndDelete({ _id: id, owner });
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }

        res.json({
            message: "Delete success",
        })
    } catch (error) {
        next(error)
    }
};

export default {
    addContact,
    editContact,
    deleteContact
};
