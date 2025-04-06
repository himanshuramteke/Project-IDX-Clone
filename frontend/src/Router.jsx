import { Route, Routes } from "react-router-dom";
import { CreateProject } from "./pages/CreateProject";
import { ProjectPlayground } from "./pages/ProjectPlayground";
import { LoginPage } from "./pages/Auth/LoginPage";
import { SignupPage } from "./pages/Auth/SignupPage";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<CreateProject />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/project/:projectId" element={<ProjectPlayground />} />
        </Routes>
    )
}