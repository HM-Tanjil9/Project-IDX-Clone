import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject.js";

export const CreateProject = () => {
    
    const {createProjectMutation, isPending} = useCreateProject();
    const navigate = useNavigate();
    async function handleCreateProject() {
        try{
            const response = await createProjectMutation();
            navigate(`/projects/${response.data}`);
        } catch(err) {
            console.log('Failed to creating the project', err);
            
        }
    }

    return (
        <div>
            
            <Row>
                <Col span={24}>
                    <Button type="primary" onClick={handleCreateProject}>Create Playground</Button>
                    {isPending && <p>Creating project...</p>}
                </Col>
            </Row>
        </div>
    )
}