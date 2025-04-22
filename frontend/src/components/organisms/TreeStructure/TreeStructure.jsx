import { useEffect } from "react";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore.js";
import { useTreeStructureStore } from "../../../store/useTreeStructureStore.js";
import { FileContextMenu } from "../../molecules/ContextMenu/FileContextMenu.jsx";
import { TreeNode } from "../../molecules/TreeNode/TreeNode.jsx";

export const TreeStructure = () => {
    const { treeStructure, setTreeStructure } = useTreeStructureStore();
    const { 
        file,
        isOpen: isFileContextOpen,
        x: fileContextX,
        y: fileContextY
     } = useFileContextMenuStore();


    useEffect(() => {
        if(treeStructure) {
            console.log('Tree: ', treeStructure);
        } else {
            setTreeStructure();
        }
    }, [treeStructure, setTreeStructure]);
    return (
        <>
            {
                isFileContextOpen && fileContextX && fileContextY && (
                    <FileContextMenu
                        x={fileContextX}
                        y={fileContextY}
                        path={file}
                    />
                )
            }
            <TreeNode fileFolderData={treeStructure}/>
        </>
    )
}