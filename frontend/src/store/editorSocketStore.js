import { create } from 'zustand';
import { useActiveFileTab } from './useActiveFileTab';
import { useTreeStructureStore } from './useTreeStructureStore';

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {
        const activeFileTabSetter = useActiveFileTab.getState().setActiveFileTab;
        const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;
        // Read file successfully done
        incomingSocket?.on("readFileSuccess", (data) => { 
            console.log("Read file success", data);
            const fileExtension = data.path.split('.').pop();
            activeFileTabSetter(data.path, data.value, fileExtension);
        });

        // On write file success
        incomingSocket?.on("writeFileSuccess", (data) => {
            console.log('Write file success', data);
            incomingSocket.emit("readFile", {
                pathToFileOrFolder: useActiveFileTab.getState().activeFileTab.path,
            })
        });
        // On delete file success
        incomingSocket?.on('deleteFileSuccess', () => {
            projectTreeStructureSetter();
        })

        set({
            editorSocket: incomingSocket
        })
    }
}));