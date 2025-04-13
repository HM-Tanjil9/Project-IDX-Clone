import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
export const TreeNode = ({fileFolderData}) => {
    const [visibility, setVisibility] = useState({})

    console.log(fileFolderData);
    
    function toggleVisibility(name) {
        setVisibility({
            ...visibility,
            [name]: !visibility[name]
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
                    <p
                        style={{
                            paddingTop: '10px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginLeft: '5px',
                        }}
                    >
                        {fileFolderData.name}
                    </p>
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