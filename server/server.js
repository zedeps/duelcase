
import express from 'express';
import router from './routes/deck.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';


const app = express();
app.use(express.json({limit: '50mb', extended: true, parameterLimit: 50000}), cors());
app.use('/api', router);
dotenv.config();
const PORT = process.env.PORT;
dbConnect();
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);
