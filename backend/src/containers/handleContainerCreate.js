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
        // Delete existing container
        const existingContainer = await docker.listContainers({
            name: projectId
        });
        console.log("existing container",existingContainer);
        if(existingContainer.length > 0) {
            console.log("container already exists. stopping and removing");
            const container = docker.getContainer(existingContainer[0].Id);
            await container.remove({force: true});
        }
        
        const container = await docker.createContainer({
            Image: 'sandbox',
            name: projectId,
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
        return container;
        
    } catch(error) {
        console.log('Error while creating the container', error);
        
    }
}

export async function getContainerPort(containerName) {
    const container = await docker.listContainers({
        name: containerName,
    });
    if(container.length > 0) {
        const containerInfo = await docker.getContainer(container[0].Id).inspect();
        console.log('container info', containerInfo);
        return containerInfo.NetworkSettings.Ports['5173/tcp'][0].HostPort;
        
    }
}
