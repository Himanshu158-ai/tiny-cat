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


export default app;