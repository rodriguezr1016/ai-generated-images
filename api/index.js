import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import dalleRoute from "./routes/dalleRoute.js"
import posttRoute from "./routes/postRoute.js"


dotenv.config();
/*password: cC7Z4Z9IKt2mCmKI username: rodriguezr1016 */
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('api/v1/post', posttRoute)
app.use('api/v1/dalle', dalleRoute)

app.get('/', async (req, res)=>{
    res.send('Hello World')
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server is running on port http://localhost:8080'))
    } catch (error) {
        console.log(error)
    }
};

startServer();