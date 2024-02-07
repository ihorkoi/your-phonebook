import express from 'express';
import ctrl from "../../controllers/contacts.js";
import { authenticate } from '../../middlewares/authenticate.js';
// import { registerSchema, loginSchema } from '../../models/Users.js';
import { validateBody } from '../../middlewares/validateBody.js';



export const contactsRouter = express.Router();

contactsRouter.use(authenticate)

contactsRouter.get("/", ctrl.getContacts)

contactsRouter.post('/', validateBody(), ctrl.addContact)

contactsRouter.put('/:id', validateBody(), ctrl.updateContact)

contactsRouter.delete("/:id", ctrl.deleteContact)


