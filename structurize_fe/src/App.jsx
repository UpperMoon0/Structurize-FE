import './App.css';
import StructureListComponent from "./components/structure_list/StructureListComponent.jsx";
import StructureDetailsComponent from "./components/structure_details/StructureDetailsComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StructureListComponent />} />
                <Route path="/structure-list" element={<StructureListComponent />} />
                <Route path="/structure-details/:id" element={<StructureDetailsComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;