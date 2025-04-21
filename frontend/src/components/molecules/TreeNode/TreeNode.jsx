import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useEditorSocketStore } from "../../../store/editorSocketStore.js";
import { FileIcon } from "../../atoms/EditorButton/FileIcon/FileIcon.jsx";
export const TreeNode = ({fileFolderData}) => {
    const [visibility, setVisibility] = useState({});
    const {editorSocket} = useEditorSocketStore();

    // console.log("file folder data", fileFolderData);
    
    function toggleVisibility(name) {
        setVisibility({
            ...visibility,
            [name]: !visibility[name]
        })
    }

    function computeExtension(fileFolderData) {
        const names = fileFolderData.name.split('.');
        return names[names.length - 1];
    }

    function handleDoubleClick(fileFolderData) {
        console.log("Double clicked on", fileFolderData);
        editorSocket.emit('readFile', {
            pathToFileOrFolder: fileFolderData.path
        })
        
    }
    
    return (
        (fileFolderData && <div
            style={{
                paddingLeft: "15px",
                color: "white"
            }}
        >
            {
                fileFolderData.children ? (
                    <button
                        style={{
                            border: 'none',
                            cursor: 'pointer',
                            outline: 'none',
                            paddingTop: '16px',
                            fontSize: '16px',
                            backgroundColor: 'transparent',
                            color: 'white'
                        }}
                        onClick={() =>  toggleVisibility(fileFolderData.name)}
                    >
                        {
                            visibility[fileFolderData.name] ? <IoIosArrowDown/> : <IoIosArrowForward/>
                        }
                        {fileFolderData.name}
                    </button>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {
                            <FileIcon extension={computeExtension(fileFolderData)}/> 
                        }
                        <p
                            style={{
                                paddingTop: '0px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                marginLeft: '5px',
                            }}
                            onDoubleClick={() => handleDoubleClick(fileFolderData)}
                        >
                            {fileFolderData.name}
                        </p>
                    </div>
                )
            }
            {
                visibility[fileFolderData.name] && fileFolderData.children && (
                    fileFolderData.children.map((child) => (
                        <TreeNode
                            fileFolderData={child}
                            key={child.name}
                        />
                    ))
                )
            }
        </div>)
    )
}