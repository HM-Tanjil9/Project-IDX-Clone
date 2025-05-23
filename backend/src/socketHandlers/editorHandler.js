import fs from 'fs/promises';
import { getContainerPort } from '../containers/handleContainerCreate.js';

export const handleEditorSocketEvents = (socket, editorNamespace) => {
    // For write the file
    socket.on("writeFile", async ({data, pathToFileOrFolder}) => {
        try {
            const response = await fs.writeFile(pathToFileOrFolder, data)
            editorNamespace.emit("writeFileSuccess", {
                data: "File written successfully",
            })
        } catch(error) {
            console.log("Error writing the file", error);
            socket.emit("writeFileError", {
                data: "Error writing the file",
            })
            
        }
    })

    // For create the file
    socket.on("createFile", async ({pathToFileOrFolder}) => {
        const isFileAlreadyPresent = await fs.stat(pathToFileOrFolder);
        if(isFileAlreadyPresent) {
            socket.emit("error", {
                data: "File already exists"
            });
            return;
        }

        try {
            const response = await fs.writeFile(pathToFileOrFolder, "");
            socket.emit("createFileSuccess", {
                data: "File created successfully"
            });
        } catch(error) {
            console.log('Error creating file', error);
            socket.emit('error', {
                data: 'Error creating file'
            });
        }
    })

    // For read the file
    socket.on('readFile', async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.readFile(pathToFileOrFolder);
            console.log(response.toString());
            
            socket.emit('readFileSuccess', {
                value: (await response).toString(),
                path: pathToFileOrFolder
            })
        } catch(error) {
            console.log('Error reading the file', error);
            socket.emit('error', {
                data: 'Error reading file'
            })
        }
    });

    // For delete the file
    socket.on('deleteFile', async ({pathToFileOrFolder}) => {
        try {
            const response = fs.unlink(pathToFileOrFolder);
            socket.emit('deleteFileSuccess', {
                data: 'File deleted successfully',
            });
        } catch(error) {
            console.log('Error deleting the file', error);
            socket.emit('error', {
                data: 'Error deleting the file'
            })
        }
    });

    // Create Folder
    socket.on('createFolder', async ({ pathToFileOrFolder }) => {
        try {
            const response  = await fs.mkdir(pathToFileOrFolder);
            socket.emit('createFolderSuccess', {
                data: 'Folder created successfully'
            })
        } catch(error) {
            console.log('Error creating the folder', error);
            socket.emit('error', {
                data: 'Error creating the folder'
            })
            
        }
    })

    // Delete folder
    socket.on('deleteFolder', async ({pathToFolderOrFolder}) => {
        try {
            const response = fs.rmdir(pathToFileOrFolder, { recursive: true });
            socket.emit('deleteFolderSuccess', {
                data: 'Folder deleted successfully',
            });
        } catch(error) {
            console.log('Error deleting the Folder', error);
            socket.emit('error', {
                data: 'Error deleting the Folder'
            })
        }
    });

    // get Port
    socket.on('getPort', async ({ containerName }) => {
        const port = await getContainerPort(containerName);
        console.log("port data", port);
        
        socket.emit('getPortSuccess', {
            port: port,
        })
    });
}