import { useState, useEffect } from 'react';
import StructureService from '../api/StructureService';
import BlockService from '../api/BlockService';
import StructureRendererComponent from "./StructureRendererComponent.jsx";
import UploadStructureComponent from "./UploadStructureComponent.jsx";

function StructureDetailsComponent() {
    const [inputValue, setInputValue] = useState('');
    const [structure, setStructure] = useState({
        name: "Unloaded",
        description: "Unloaded",
        blockIds: [[["minecraft:dirt"]]]
    });
    const [blocks, setBlocks] = useState([]);
    const structureService = new StructureService();
    const blockService = new BlockService();

    useEffect(() => {
        const fetchBlocks = async () => {
            try {
                const fetchedBlocks = await blockService.getBlocks();
                setBlocks(fetchedBlocks);
            } catch (error) {
                console.error('Error fetching blocks:', error);
            }
        };

        fetchBlocks().then(() => console.log('Blocks fetched'));
    }, []);

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
            <div>
                <UploadStructureComponent />
            </div>
            <div className="structure-renderer-container">
                <StructureRendererComponent structure={structure.blockIds} blocks={ blocks } />
            </div>
        </div>
    );
}

export default StructureDetailsComponent;