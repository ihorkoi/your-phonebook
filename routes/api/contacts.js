import express from 'express';
import ctrl from "../../controllers/contacts.js";
import { authenticate } from '../../middlewares/authenticate.js';
import { addContactSchema } from '../../models/Contact.js.js';
import { validateBody } from '../../middlewares/validateBody.js';



export const contactsRouter = express.Router();

contactsRouter.use(authenticate)

contactsRouter.get("/", ctrl.getContacts)

contactsRouter.post('/', validateBody(addContactSchema), ctrl.addContact)

contactsRouter.put('/:id', ctrl.updateContact)

contactsRouter.delete("/:id", ctrl.deleteContact)


