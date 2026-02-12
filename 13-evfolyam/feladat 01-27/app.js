import express from "express";
import db from "./data/db.js"

const PORT = 3030;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server runs on port: ${PORT}`);
})