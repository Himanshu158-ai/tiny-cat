import express from 'express'
import { createCat,getAllCats,getCat } from "../controllers/cats.controllers.js"


const catRoutes = express.Router();

catRoutes.post('/',createCat);
catRoutes.get('/',getAllCats);
catRoutes.get('/:id',getCat);


export default catRoutes
