import cors from 'cors';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/index.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/api', apiRouter);

app.get('/health', (req, res) => {
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Api is alive",
        error: {},
        data: {}
    });
})

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});