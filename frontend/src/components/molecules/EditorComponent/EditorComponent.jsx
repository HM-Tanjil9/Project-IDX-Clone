import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

export const EditorComponent = () => {
    const [editorState, setEditorState] = useState({
        theme: null
    })
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
                    defaultLanguage="javascript"
                    defaultValue="// Welcome to the playground"
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