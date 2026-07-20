import express from 'express'
import guardx from "guardx-rate-limit";
const app = express();


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



export default app;