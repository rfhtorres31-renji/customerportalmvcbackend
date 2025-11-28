import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
 

const app = express(); // create an express instance of a function

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: 'true'
}


app.use(cors(corsOptions)); 
app.use(express.json());
app.use('/api', routes);

app.get('/api/hello', (req, res)=> {
     res.json({message: "Successfully running on port 3304"}); // Sends back to the client
});


export default app;