import {useEffect, useState} from 'react';
import StructureService from "../../api/StructureService.js";
import StructureCardComponent from "./StructureCardComponent.jsx";
import './StructureList.css';

function StructureListComponent() {
    const [structures, setStructures] = useState([]);

    useEffect(() => {
        const structureService = new StructureService();
        const fetchStructures = async () => {
            try {
                const fetchedStructures = await structureService.getAllStructures();
                setStructures(fetchedStructures);
            } catch (error) {
                console.error('Error fetching structures:', error);
            }
        };

        fetchStructures().then();
    }, []);

    return (
        <div className="container">
            <div className="list">
                {structures.map((structure) => (
                    <StructureCardComponent key={structure.id} structure={structure} />
                ))}
            </div>
        </div>
    );
}

export default StructureListComponent;