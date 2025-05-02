import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { BrowserTerminal } from "../components/molecules/BrowserTerminal/BrowserTerminal.jsx";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent.jsx";
import { Browser } from "../components/organisms/Browser/Browser.jsx";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure.jsx";
import { useEditorSocketStore } from "../store/editorSocketStore.js";
import { useTerminalSocketStore } from "../store/terminalSocketStore.js";
import { useTreeStructureStore } from "../store/useTreeStructureStore.js";


export const ProjectsPlayground = () => {
    const {projectId: projectIdFromUrl} = useParams();
    const {projectId, setProjectId} = useTreeStructureStore();
    const {setEditorSocket} = useEditorSocketStore();
    const {terminalSocket, setTerminalSocket} = useTerminalSocketStore();
    const [loadBrowser, setLoadBrowser] = useState(false);

    useEffect(() => {
        if(projectIdFromUrl) {
            setProjectId(projectIdFromUrl);
            const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
                query: {
                    projectId: projectIdFromUrl,
                }
            });
            try{
                /**
                 * !!! attachAddon didn't work properly with socket.IO
                 */
                const ws = new WebSocket("ws://localhost:3333/terminal?projectId="+projectIdFromUrl); // new Raw websocket for attachAddon 
                setTerminalSocket(ws);
            } catch(err) {
                console.log('error in ws', err);
                
            }
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
                            paddingTop: '0',
                            minWidth: '250px',
                            maxWidth: '20%',
                            height: '100vh',
                            overflow: 'auto'
                        }}
                    >
                        <TreeStructure/>
                    </div>
                )}
                <div
                    style={{
                        width: '100vw',
                        height: '100vh',
                    }}
                >
                    <Allotment>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#282a36'
                            }}
                        >
                            <Allotment
                                vertical={true}
                            >
                                <EditorComponent/>
                                {/* <Divider orientation="left" style={{color: 'white' , backgroundColor: '#17153B', padding: '0', margin: '0'}} plain>Terminal</Divider> */}
                                <BrowserTerminal/>
                            </Allotment>
                        </div>
                        <div>
                            <Button onClick={() => {setLoadBrowser(true)}}>
                                Load my browser
                            </Button>
                                {loadBrowser && projectIdFromUrl && terminalSocket && <Browser projectId={projectIdFromUrl}/>}
                        </div>
                    </Allotment>
                </div>
            </div>
            {/* <EditorButton isActive={true}/>
            <EditorButton isActive={false}/> */}
            
        </div>
    )
}