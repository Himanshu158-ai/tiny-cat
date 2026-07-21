import express from 'express'
const app = express();
import guardx from "guardx-rate-limit";
import cors from "cors";
import catRoutes from './routes/cats.routes.js';
import { generateResponse } from './services/gemini.service.js';
import aiRoutes from './routes/ai.routes.js';


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

export default app;