import express from 'express'
const app = express();
import guardx from "guardx-rate-limit";
import cors from "cors";
import catRoutes from './routes/cats.routes.js';
import { generateResponse } from './services/gemini.service.js';
import aiRoutes from './routes/ai.routes.js';
import aiRecommendRoutes from './routes/ai.recommend.routes.js';


app.use(express.json());
app.use(cors());

//rate limiting
app.use(
    guardx({
        limit: 50,
        windowMs: 60 * 1000
    })
);


// health route
app.get("/health", (req, res) => {
    res.json({
        staus: true,
        message: "Cat succesfully fetched..."
    })
})

// cat routes
app.use('/api/cat', catRoutes);

// ai routes
app.use("/api/ai", aiRoutes);

// ai recommend routes
app.use("/api/ai/recommend", aiRecommendRoutes);

export default app;