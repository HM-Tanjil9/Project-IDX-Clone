import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton.jsx";
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTerminal.jsx";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent.jsx";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure.jsx";
import { useEditorSocketStore } from "../store/editorSocketStore.js";
import { useTerminalSocketStore } from "../store/terminalSocketStore.js";
import { useTreeStructureStore } from "../store/useTreeStructureStore.js";


export const ProjectsPlayground = () => {
    const {projectId: projectIdFromUrl} = useParams();
    const {projectId, setProjectId} = useTreeStructureStore();
    const {editorSocket, setEditorSocket} = useEditorSocketStore();
    const {setTerminalSocket} = useTerminalSocketStore();
    function fetchPort() {
        editorSocket.emit('getPort', {containerName: projectIdFromUrl});
        console.log('fetch port');
        
    }
    useEffect(() => {
        if(projectIdFromUrl) {
            setProjectId(projectIdFromUrl);
            const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
                query: {
                    projectId: projectIdFromUrl,
                }
            });
            /**
             * !!! attachAddon didn't work properly with socket.IO
             */
            const ws = new WebSocket("ws://localhost:3333/terminal?projectId="+projectIdFromUrl); // new Raw websocket for attachAddon 
            setTerminalSocket(ws);
            setEditorSocket(editorSocketConn);
        }
    },[setProjectId, projectIdFromUrl, setEditorSocket, setTerminalSocket]);
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
            <button onClick={fetchPort}>Get Port</button>
            <div>
                <BrowserTerminal/>
            </div>
        </div>
    )
}