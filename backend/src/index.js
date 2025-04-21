import chokidar from 'chokidar';
import cors from 'cors';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/index.js';
import { handleEditorSocketEvents } from './socketHandlers/editorHandler.js';

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

const editorNamespace = io.of('/editor');
editorNamespace.on("connection", (socket) => {
    console.log("Editor connected");
    // get projectId from frontend
    let projectId = socket.handshake.query['projectId'];
    console.log("Project id received after connection", projectId);
    
    if (projectId) {
        const watcher = chokidar.watch(`./projects/${projectId}`, {
            ignored: (path) => path.includes("node_modules"),
            persistent: true,   /** keep the watcher on */
            awaitWriteFinish: {
                stabilityThreshold: 2000, /** Ensure stability of files before triggering the event */
            },
            ignoreInitial: true
        });


        watcher.on('all', (event, path) => {
            console.log(event, path);
            
        })
    }
    handleEditorSocketEvents(socket, editorNamespace);

    socket.on("disconnect", () => {
        console.log('editor disconnected');
        
    })
    
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});