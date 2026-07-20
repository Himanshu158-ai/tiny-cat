import express from 'express'
import { createCats } from "../controllers/cats.controllers.js"


const catRoutes = express.Router();

catRoutes.post('/',createCats);


export default catRoutes
