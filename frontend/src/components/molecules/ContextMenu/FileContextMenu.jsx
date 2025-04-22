import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore.js";
import './FileContextMenu.css';

export const FileContextMenu = ({ x, y, path }) => {
    const {setIsOpen} = useFileContextMenuStore();
    const {editorSocket} = useEditorSocketStore();
    function handleFileDelete(e, path) {
        e.preventDefault();
        console.log('Deleting file at', path);
        editorSocket?.emit('deleteFile', {
            pathToFileOrFolder: path
        });
        
    }
    return (
        <div
            className="fileContextOptionWrapper"
            onMouseLeave={() => {
                console.log('Mouse leave');
                setIsOpen(false);
            }}
            style={{
                left: x,
                top: y,
            }}
        >
            <button className="fileContextButton" onClick={(e) => handleFileDelete(e, path)}>
                Delete File
            </button>
            <button className="fileContextButton">
                Rename File
            </button>
        </div>
    )
}