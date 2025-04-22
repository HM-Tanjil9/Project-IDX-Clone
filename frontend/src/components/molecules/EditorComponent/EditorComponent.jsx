import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useEditorSocketStore } from "../../../store/editorSocketStore.js";
import { useActiveFileTab } from "../../../store/useActiveFileTab.js";
import { extensionToFileType } from "../../../utils/extensionToFileType.js";

export const EditorComponent = () => {
    let timerId = null;
    const [editorState, setEditorState] = useState({
        theme: null
    });
    const {activeFileTab} = useActiveFileTab();
    const {editorSocket} = useEditorSocketStore();

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

    function handleChange(value) {
        /**
         * * Debouncing technique
         */
        if(timerId !== null) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            const editorContent = value;
            console.log("Sending write file event");
            
            editorSocket.emit("writeFile", {
                data: editorContent,
                pathToFileOrFolder: activeFileTab.path,
            });
        }, 2000);
    }
    /** 
    * ! This Message is 
    * * Highlighted for u
    * TODO kam kor
    * ? oi what
    
    */
    
    useEffect(() => {
        downloadTheme();
    }, []);
    return (
        /**
        * TODO:
            * Setup a theme for editor
        * * Done   
        
        */
        <>
            {
                editorState.theme && 
                <Editor 
                    height={'100vh'}
                    defaultLanguage={undefined}
                    language={extensionToFileType(activeFileTab?.extension)}
                    defaultValue= "// Welcome to the playground"
                    value={activeFileTab?.value}
                    options={{
                        fontSize: 18,
                        fontFamily: 'monospace'
                    }}
                    onMount={handleEditorTheme}
                    onChange={handleChange}
                />
            } 
        </>
    )
}