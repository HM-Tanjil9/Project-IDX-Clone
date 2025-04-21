import { create } from 'zustand';
import { useActiveFileTab } from './useActiveFileTab';

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {
        const activeFileTabSetter = useActiveFileTab.getState().setActiveFileTab;
        // Read file successfully done
        incomingSocket?.on("readFileSuccess", (data) => { 
            console.log("Read file success", data);
            activeFileTabSetter(data.path, data.value)
        });

        // On write file success
        incomingSocket?.on("writeFileSuccess", (data) => {
            console.log('Write file success', data);
            incomingSocket.emit("readFile", {
                pathToFileOrFolder: useActiveFileTab.getState().activeFileTab.path,
            })
            
        })
        set({
            editorSocket: incomingSocket
        })
    }
}));