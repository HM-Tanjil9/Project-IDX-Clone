import { useEffect } from "react";
import { useTreeStructureStore } from "../../../store/useTreeStructureStore.js";
import { TreeNode } from "../../molecules/TreeNode/TreeNode.jsx";

export const TreeStructure = () => {
    const { treeStructure, setTreeStructure } = useTreeStructureStore();


    useEffect(() => {
        if(treeStructure) {
            console.log('Tree: ', treeStructure);
        } else {
            setTreeStructure();
        }
    }, [treeStructure, setTreeStructure]);
    return (
        <div>
            <TreeNode fileFolderData={treeStructure}/>
        </div>
    )
}