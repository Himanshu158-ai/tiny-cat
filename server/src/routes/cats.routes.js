import express from 'express'
import { createCat,getAllCats,getCat, recommendCat } from "../controllers/cats.controllers.js"


const catRoutes = express.Router();

//create cat
catRoutes.post('/',createCat);

//fetched all cats
catRoutes.get('/',getAllCats);

//fetched one cat based on 'id'
catRoutes.get('/:id',getCat);

//fetched one cat based on 'recommend'
catRoutes.post('/recommend',recommendCat);


export default catRoutes
