import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { handleContainerCreate } from './containers/handleContainerCreate.js';
import { handleTerminalCreation } from './containers/handleTerminalCreation.js';

const app = express();
const server = createServer(app);


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

server.listen(3333, () => {
    console.log(`Server is running on port ${3333}`);
    
});


// terminal events

const webSocketForTerminal = new WebSocketServer({
    //noServer: true, // custom upgrade event handle for raw webSocket 
    server
});


webSocketForTerminal.on("connection", async (ws, req) => { // Removed `container` parameter
    console.log('Terminal connected');
    const isTerminal = req.url.includes("/terminal");
    if (isTerminal) {
        const projectId = req.url.split('=')[1];
        console.log("Id after connection", projectId);
        
        try {
            const container = await handleContainerCreate(projectId, webSocketForTerminal);
            if (!container) {
                throw new Error("Failed to create container");
            }
            handleTerminalCreation(container, ws);
        } catch (err) {
            console.error("Error in terminal connection:", err);
            ws.close(); // Close connection if container creation fails
        }
    }
});
