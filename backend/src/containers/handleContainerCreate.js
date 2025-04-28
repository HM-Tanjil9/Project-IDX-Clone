import Docker from 'dockerode';
const docker = new Docker();

export const listContainers = async () => {
    const containers = await docker.listContainers();
    console.log('containers', containers);
    // print port array
    containers.forEach(containerInfo => {
        console.log(containerInfo.Ports);
        
    });
    
}

export const handleContainerCreate = async (projectId, terminalSocket, req, tcpSocket, head) => {
    console.log('Project id received for container create', projectId);    
    try {
        const container = await docker.createContainer({
            Image: 'sandbox',
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['/bin/bash'],
            Tty: true,
            User: "sandbox",
            ExposedPorts: {
                "5173/tcp": {}
            },
            Env: ["HOST=0.0.0.0"],
            HostConfig: {
                Binds: [
                    `${process.cwd()}/projects/${projectId}:/home/sandbox/app`
                ],
                PortBindings: {
                    "5173/tcp": [{ "HostPort": "0" }] // random port will assigned by docker
                },
            },
        });
        console.log('Container created', container.id);
        await container.start();
        console.log('container started');
        // upgrade the connection to websocket
        terminalSocket.handleUpgrade(req, tcpSocket, head, (establishedWSConn) => {
            terminalSocket.emit("connection", establishedWSConn, req, container);
        });
        
    } catch(error) {
        console.log('Error while creating the container', error);
        
    }
}
