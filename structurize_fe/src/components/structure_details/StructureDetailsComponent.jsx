import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StructureService from '../../api/StructureService.js';
import BlockService from '../../api/BlockService.js';
import StructureRendererComponent from "./StructureRendererComponent.jsx";
import UploadStructureComponent from "./UploadStructureComponent.jsx";

function StructureDetailsComponent() {
    const { id } = useParams();
    const [structure, setStructure] = useState({
        name: "Unloaded",
        description: "Unloaded",
        blockIds: [[["minecraft:dirt"]]]
    });
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        const blockService = new BlockService();
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

    useEffect(() => {
        const structureService = new StructureService();
        const fetchStructure = async () => {
            try {
                const fetchedStructure = await structureService.getStructureById(id);
                setStructure(fetchedStructure);
            } catch (error) {
                console.error('Error fetching structure:', error);
            }
        };

        fetchStructure().then(() => console.log('Structure fetched'));
    }, [id]);

    return (
        <div>
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
                <StructureRendererComponent structure={structure.blockIds} blocks={blocks} />
            </div>
        </div>
    );
}

export default StructureDetailsComponent;