import express from "express";
import { askAi } from "../controllers/ai.controllers.js";

const aiRoutes = express.Router();

aiRoutes.post("/ask", askAi);



export default aiRoutes;