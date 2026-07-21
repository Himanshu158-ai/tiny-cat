import express from 'express'
const app = express();
import guardx from "guardx-rate-limit";
import catRoutes from './routes/cats.routes.js';
import { generateResponse } from './services/gemini.service.js';


app.use(express.json());

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
app.post("/api/ai", async(req, res) => {
    const data = await generateResponse("who is virat kohli?");
    return res.json({
        data
    })
})

export default app;