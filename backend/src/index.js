import chokidar from 'chokidar';
import cors from 'cors';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { WebSocketServer } from 'ws';
import { PORT } from './config/serverConfig.js';
import { handleContainerCreate, listContainers } from './containers/handleContainerCreate.js';
import { handleTerminalCreation } from './containers/handleTerminalCreation.js';
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

// editor events
const editorNamespace = io.of('/editor');
editorNamespace.on("connection", (socket) => {
    console.log("Editor connected");
    // get projectId from frontend
    let projectId = socket.handshake.query['projectId'];
    // console.log("Project id received after connection", projectId);
    
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
    socket.on('getPort', () => {
        console.log('get port event listen');
        listContainers()
    });

    handleEditorSocketEvents(socket, editorNamespace);

    socket.on("disconnect", () => {
        console.log('editor disconnected');
        
    })
    
})

// terminal events


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});

const webSocketForTerminal = new WebSocketServer({
    noServer: true, // custom upgrade event handle for raw webSocket 
});

/**
 * Someone try to upgrade http req or webSocket setup
 * 
 */
server.on("upgrade", (req, tcp, head) => {
    /**
     * * req: Incoming http request
     * * socket: TCP socket
     * * head: Buffer containing the first packet of the upgrade stream 
     */
    // This callback will called when a client tries to connect to the server through webSocket
    const isTerminal = req.url.includes("/terminal");
    if(isTerminal) {
        const projectId = req.url.split('=')[1];
        console.log("Id after connection", projectId);
        handleContainerCreate(projectId, webSocketForTerminal, req, tcp, head);
        
    }
});

webSocketForTerminal.on("connection", (ws, req, container) => {
    console.log('Terminal connected');
    handleTerminalCreation(container, ws);
    // get port
    

    // after close connection
    ws.on("close", () => {
        container.remove({force: true,}, (err, data) => {
            if(err) {
                console.log("Error while removing container", err);
                return;
            }
            console.log('Container remove', data);
            
        })
    })
    
})
