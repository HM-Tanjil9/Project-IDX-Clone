import { ReloadOutlined } from "@ant-design/icons";
import { Input, Row } from "antd";
import { useEffect, useRef } from "react";
import { useEditorSocketStore } from "../../../store/editorSocketStore.js";
import { usePortStore } from "../../../store/portStore.js";

export const Browser = (projectId) => {
    const browserRef = useRef(null);
    const {port} = usePortStore();
    const {editorSocket} = useEditorSocketStore();
    function handleRefresh() {
        if(browserRef.current) {
            const oldAddress = browserRef.current.src;
            browserRef.current.src = oldAddress;
        }
    }

    useEffect(() => {
        if(!port) {
            editorSocket?.emit('getPort', {
                containerName: projectId,
            });
        }
    },[port, editorSocket, projectId]);
    
    if(!port) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <Row
                style={{
                    backgroundColor: "#22212b",

                }}
            >
                <Input
                    style={{
                        width: '100%',
                        height: '30px',
                        color: 'white',
                        fontFamily: 'Fira Code',
                        backgroundColor: '#282a35',
                    }}
                    prefix={<ReloadOutlined onClick={handleRefresh}/>}
                    defaultValue={`http://localhost:${port}`}
                    
                />
                <iframe
                    ref={browserRef}
                    src={`http://localhost:${port}`}
                    style={{
                        width: '100%',
                        height: '95vh',
                        border: 'none',

                    }}
                />
                
            </Row>
        </div>
    )
}