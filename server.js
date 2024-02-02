import { app } from "./app.js";
import mongoose from "mongoose";
import 'dotenv/config'

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ftyhl8m.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3001, () => {
            console.log("Server is running on PORT:3001")
        })
    })
    .catch(
        () => {
            console.log('Something went wrong, please try again later')
        }
    )
