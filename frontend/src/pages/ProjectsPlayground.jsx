import { useParams } from "react-router-dom";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton.jsx";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent.jsx";

export const ProjectsPlayground = () => {
    const {projectId} = useParams();
    return (
        <div>
            Project Id: {projectId}
            <EditorComponent/>
            <EditorButton isActive={true}/>
            <EditorButton isActive={false}/>
        </div>
    )
}