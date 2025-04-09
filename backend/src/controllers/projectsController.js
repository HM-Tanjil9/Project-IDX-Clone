import child_process from 'child_process';
import fs from 'fs/promises';
import util from 'util';
import uuid4 from 'uuid4';
import { REACT_PROJECT_CREATE } from '../config/serverConfig.js';

const execPromisified = util.promisify(child_process.exec);

export const createProjectController = async (req, res) => {
    const projectId = uuid4(); //generate a unique id
    console.log("New project id:", projectId);

    // create folder with unique id 
    await fs.mkdir(`./projects/${projectId}`,{recursive: true});
    // await issue
    const response = execPromisified(
        REACT_PROJECT_CREATE,
        { cwd: `./projects/${projectId}` }
    );
      
    return res.json({
        message: "Project created successfully",
        data: projectId
    })
}



