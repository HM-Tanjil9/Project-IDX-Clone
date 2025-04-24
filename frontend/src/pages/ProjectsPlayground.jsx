import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton.jsx";
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTerminal.jsx";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent.jsx";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure.jsx";
import { useEditorSocketStore } from "../store/editorSocketStore.js";
import { useTreeStructureStore } from "../store/useTreeStructureStore.js";

export const ProjectsPlayground = () => {
    const {projectId: projectIdFromUrl} = useParams();
    const {projectId, setProjectId} = useTreeStructureStore();
    const {setEditorSocket} = useEditorSocketStore();
    useEffect(() => {
        if(projectIdFromUrl) {
            setProjectId(projectIdFromUrl);
            const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
                query: {
                    projectId: projectIdFromUrl,
                }
            });
            setEditorSocket(editorSocketConn);
        }
    },[setProjectId, projectIdFromUrl, setEditorSocket]);
    return (
        <div>
            <div style={{display: 'flex'}}>
                {projectId && (
                    <div
                        style={{
                            backgroundColor: '#3E3F5B',
                            color: 'white',
                            paddingRight: '10px',
                            paddingTop: '0.3vh',
                            minWidth: '250px',
                            maxWidth: '25%',
                            height: '99.7vh',
                            overflow: 'auto'
                        }}
                    >
                        <TreeStructure/>
                    </div>
                )}
                <EditorComponent/>
            </div>
            <EditorButton isActive={true}/>
            <EditorButton isActive={false}/>
            <div>
                <BrowserTerminal/>
            </div>
        </div>
    )
}