import './App.css';
import StructureListComponent from "./components/structure_list/StructureListComponent.jsx";
import StructureDetailsComponent from "./components/structure_details/StructureDetailsComponent.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent.jsx";
import UploadStructureComponent from "./components/upload_structure/UploadStructureComponent.jsx";
import LoginComponent from "./components/login/LoginComponent.jsx";
import RegisterComponent from "./components/register/RegisterComponent.jsx";
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<StructureListComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/register" element={<RegisterComponent />} />
                    <Route path="/structure-list" element={<StructureListComponent />} />
                    <Route path="/structure-details/:id" element={<StructureDetailsComponent />} />
                    <Route path="/upload-structure" element={<UploadStructureComponent />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;