import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoIosFolderOpen } from "react-icons/io";
import { useEditorSocketStore } from "../../../store/editorSocketStore.js";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore.js";
import { FileIcon } from "../../atoms/EditorButton/FileIcon/FileIcon.jsx";
export const TreeNode = ({fileFolderData}) => {
    const [visibility, setVisibility] = useState({});
    const {editorSocket} = useEditorSocketStore();

    const {
        setFile,
        setIsOpen: setFileContextMenuOpen,
        setX: setFileContextMenuX,
        setY: setFileContextMenuY
    } = useFileContextMenuStore();
    
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
    // handle double clicked on files
    function handleDoubleClick(fileFolderData) {
        console.log("Double clicked on", fileFolderData);
        editorSocket.emit('readFile', {
            pathToFileOrFolder: fileFolderData.path
        });
    }
    // handle right click on files
    function handleContextMenuForFiles(e, path) {
        e.preventDefault();
        console.log('Right clicked on', path);

        setFile(path);
        setFileContextMenuX(e.clientX);
        setFileContextMenuY(e.clientY);
        setFileContextMenuOpen(true);
        
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
                    <div className="folders" style={{display: 'grid', gridTemplateColumns: '20px auto', alignItems: 'center', justifyContent: 'left'}}>
                        <IoIosFolderOpen/>
                        <button
                            style={{
                                border: 'none',
                                cursor: 'pointer',
                                outline: 'none',
                                padding: '10px',
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
                    </div>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {
                            <FileIcon extension={computeExtension(fileFolderData)}/> 
                        }
                        <p
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                marginLeft: '5px',
                            }}
                            onDoubleClick={() => handleDoubleClick(fileFolderData)}
                            onContextMenu={(e) => handleContextMenuForFiles(e, fileFolderData.path)}
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