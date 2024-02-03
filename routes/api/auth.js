import express from 'express';
import ctrl from "../../controllers/auth.js";
import { authenticate } from '../../middlewares/authenticate.js';
import { registerSchema, loginSchema } from '../../models/Users.js';
import { validateBody } from '../../middlewares/validateBody.js';



export const authRouter = express.Router();

authRouter.post('/signup', validateBody(registerSchema), ctrl.register)

authRouter.post('/login', validateBody(loginSchema), ctrl.login)

authRouter.get("/current", authenticate, ctrl.getCurrent)

authRouter.post("/logout", authenticate, ctrl.logout)

authRouter.patch("/", authenticate, ctrl.updateById);

