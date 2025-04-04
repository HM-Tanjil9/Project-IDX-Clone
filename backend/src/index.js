import cors from 'cors';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { PORT } from './config/serverConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/health', (req, res) => {
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Api is alive",
        error: {},
        data: {}
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});