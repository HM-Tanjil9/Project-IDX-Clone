import { Route, Routes } from "react-router-dom"
import { CreateProject } from "./pages/CreateProject.jsx"
import { ProjectsPlayground } from "./pages/ProjectsPlayground.jsx"

export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<CreateProject/>}/>
            <Route path="/projects/:projectId" element={<ProjectsPlayground/>}/>
        </Routes>
    )
}