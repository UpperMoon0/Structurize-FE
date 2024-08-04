import { useState } from 'react';
import StructureService from '../api/StructureService';
import StructureRendererComponent from "./StructureRendererComponent.jsx";

function StructureDetailsComponent() {
    const [inputValue, setInputValue] = useState('');
    const [structure, setStructure] = useState({
        name: "Unloaded",
        description: "Unloaded",
        blockIds: [[["minecraft:dirt"]]]
    });
    const structureService = new StructureService();

    const handleButtonClick = async () => {
        try {
            const fetchedStructure = await structureService.getStructureById(inputValue);
            setStructure(fetchedStructure);
        } catch (error) {
            console.error('Error fetching structure:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter text"
            />
            <button onClick={handleButtonClick}>Submit</button>
            {structure && (
                <div>
                    <h1>{structure.name}</h1>
                    <p>{structure.description}</p>
                </div>
            )}
            <div className="structure-renderer-container">
                <StructureRendererComponent structure={structure.blockIds} />
            </div>
        </div>
    );
}

export default StructureDetailsComponent;
