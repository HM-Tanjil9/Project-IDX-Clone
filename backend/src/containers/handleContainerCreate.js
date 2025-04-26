import Docker from 'dockerode';
const docker = new Docker();

export const handleContainerCreate = async (projectId, socket) => {
    console.log('Project id received for container create', projectId);
    console.log(`${process.cwd()}/projects/${projectId}`);
    
    try {
        const container = await docker.createContainer({
            Image: 'sandbox',
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['/bin/bash'],
            Tty: true,
            User: "sandbox",
            HostConfig: {
                Binds: [
                    `${process.cwd()}/projects/${projectId}:/home/sandbox/app`
                ],
                PortBindings: {
                    "5173/tcp": [{ "HostPort": "0" }] // random port will assigned by docker
                },
                ExposedPorts: {
                    "5173/tcp": {}
                },
                Env: ["HOST=0.0.0.0"]
            },
        });
        console.log('Container created', container.id);
        await container.start();
        console.log('container started');
        
    } catch(error) {
        console.log('Error while creating the container', error);
        
    }
}
