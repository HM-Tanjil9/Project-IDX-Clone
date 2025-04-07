import { Button, Col, Row } from "antd";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject.js";

export const CreateProject = () => {
    
    const {createProjectMutation, isPending} = useCreateProject();
    async function handleCreateProject() {
        console.log("Trigger the api");
        try{
            await createProjectMutation();
        } catch(err) {
            console.log('Failed to create project', err);
            
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