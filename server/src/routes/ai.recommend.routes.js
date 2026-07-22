import express from 'express'
import { aiRecommend } from '../controllers/ai.recommend.controllers.js';

const aiRecommendRoutes = express.Router();


aiRecommendRoutes.post('/',aiRecommend)



export default aiRecommendRoutes;