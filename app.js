import express from "express";
import morgan from "morgan";
import cors from "cors";
import { authRouter } from "./routes/api/auth.js";

export const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(morgan(formatsLogger))
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server Error' } = err
    res.status(status).json({
        message,
    })
})