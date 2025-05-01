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



webSocketForTerminal.on("connection", async (ws, req, container) => {
    console.log('Terminal connected');
    const isTerminal = req.url.includes("/terminal");
    if(isTerminal) {
        const projectId = req.url.split('=')[1];
        console.log("Id after connection", projectId);
        const container = await handleContainerCreate(projectId, webSocketForTerminal,);
        handleTerminalCreation(container, ws);
        
    }

    // after close connection
    // ws.on("close", () => {
    //     container.remove({force: true,}, (err, data) => {
    //         if(err) {
    //             console.log("Error while removing container", err);
    //             return;
    //         }
    //         console.log('Container remove', data);
            
    //     })
    // })
    
})
