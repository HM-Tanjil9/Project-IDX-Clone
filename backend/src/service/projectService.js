import directoryTree from 'directory-tree';
import fs from 'fs/promises';
import path from 'path';
import uuid4 from 'uuid4';
import { REACT_PROJECT_CREATE } from '../config/serverConfig.js';
import { execPromisified } from '../utils/execUtility.js';

export const createProjectService = async () => {
    const projectId = uuid4(); //generate a unique id
    console.log("New project id:", projectId);

    // create folder with unique id 
    await fs.mkdir(`./projects/${projectId}`,{recursive: true});
    // await issue
    const response = execPromisified (
        REACT_PROJECT_CREATE,
        { cwd: `./projects/${projectId}` }
    );
    return projectId;
}

export const getProjectTreeService = async (projectId) => {
    const projectPath =  path.resolve(`./projects/${projectId}`);
    const tree = directoryTree(projectPath);
    return tree;
}

