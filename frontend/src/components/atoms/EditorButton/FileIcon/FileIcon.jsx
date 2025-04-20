import { FaCss3, FaHtml5, FaJs, FaRegFileExcel } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { TbGitBranchDeleted } from "react-icons/tb";
import { VscJson } from "react-icons/vsc";

export const FileIcon = ({ extension }) => {
    // console.log(extension);
    
    const iconStyle = {
        height: '20px', width: '20px'
    }
    
    const IconMapper = {
        "js" : <FaJs color="yellow" style={iconStyle}/>,
        "jsx" : <GrReactjs color="#61dbfa" style={iconStyle}/>,
        "css" : <FaCss3 color="#3c99dc" style={iconStyle}/>,
        "html" : <FaHtml5 color="#EF9651" style={iconStyle}/>,
        "json" : <VscJson color="yellow" style={iconStyle}/>,
        "gitignore" : <TbGitBranchDeleted color="#BF3131" style={iconStyle}/>,
        "file" : <FaRegFileExcel color="#red" style={iconStyle}/>,
    }
    return (
        <>
            {IconMapper[extension] || IconMapper["file"]}    
        </>
    )
}