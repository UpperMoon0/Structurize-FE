import './App.css';
import StructureListComponent from "./components/structure_list/StructureListComponent.jsx";
import StructureDetailsComponent from "./components/structure_details/StructureDetailsComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent.jsx";
import UploadStructureComponent from "./components/upload_structure/UploadStructureComponent.jsx";

function App() {
    return (
        <BrowserRouter>
            <HeaderComponent />
            <Routes>
                <Route path="/" element={<StructureListComponent />} />
                <Route path="/structure-list" element={<StructureListComponent />} />
                <Route path="/structure-details/:id" element={<StructureDetailsComponent />} />
                <Route path="/upload-structure" element={<UploadStructureComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;