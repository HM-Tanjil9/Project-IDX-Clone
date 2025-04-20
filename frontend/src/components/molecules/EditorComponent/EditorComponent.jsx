import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useEditorSocketStore } from "../../../store/editorSocketStore.js";
import { useActiveFileTab } from "../../../store/useActiveFileTab.js";

export const EditorComponent = () => {
    const [editorState, setEditorState] = useState({
        theme: null
    });
    const { editorSocket } = useEditorSocketStore();
    const {activeFileTab, setActiveFileTab} = useActiveFileTab();

    async function downloadTheme() {
        const response = await fetch('/src/assets/editor-theme/Dracula.json');
        const data = await response.json();
        setEditorState({
            ...editorState,
            theme: data
        });
    }

    function handleEditorTheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }

    editorSocket?.on("readFileSuccess", (data) => { 
        console.log("Read file success", data);
        setActiveFileTab(data.path, data.value)
    });
    
    
    useEffect(() => {
        downloadTheme();
    }, []);
    return (
        /**
        TODO:
            setup a theme for code editor 
        
        */
        <>
            {
                editorState.theme && <Editor 
                    height={'100vh'}
                    defaultLanguage='undefined'
                    defaultValue= "// Welcome to the playground"
                    value={activeFileTab?.value}
                    options={{
                        fontSize: 18,
                        fontFamily: 'monospace'
                    }}
                    onMount={handleEditorTheme}
                />
            } 
        </>
    )
}