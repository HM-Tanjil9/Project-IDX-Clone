import child_process from 'child_process';
import fs from 'fs/promises';
import util from 'util';
import uuid4 from 'uuid4';

const execPromisified = util.promisify(child_process.exec);

export const createProjectController = async (req, res) => {
    const projectId = uuid4(); //generate a unique id
    console.log("New project id:", projectId);

    // create folder with unique id 
    try{
        await fs.mkdir(`./projects/${projectId}`,{recursive: true});
        // remove await for get postman perfect response
        const response = await execPromisified(
            'npm create vite@latest playground-react -- --template react --yes',
            { cwd: `./projects/${projectId}` }
        );
    } catch(err) {
        console.error('Failed to create project :', err);
    }
  
    return res.json({
        message: "Project created successfully",
        data: projectId
    })
}
