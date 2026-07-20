import express from 'express'
const app = express();
import guardx from "guardx-rate-limit";
import catRoutes from './routes/cats.routes.js';


app.use(express.json());

//rate limiting
app.use(
    guardx({
        limit: 50,
        windowMs: 60 * 1000
    })
);


// health route
app.get("/health",(req,res)=>{
    res.json({
        staus:true,
        message:"Cat succesfully fetched..."
    })
})

// cat routes
app.use('/api/cat',catRoutes);

export default app;