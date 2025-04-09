import { useParams } from "react-router-dom";

export const ProjectsPlayground = () => {
    const {projectId} = useParams();
    return (
        <div>
            Playground of {projectId}
        </div>
    )
}