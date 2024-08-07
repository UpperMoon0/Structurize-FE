import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StructureService from '../../api/StructureService.js';
import BlockService from '../../api/BlockService.js';
import StructureRendererComponent from "./StructureRendererComponent.jsx";
import './StructureDetails.css';

function StructureDetailsComponent() {
    const { id } = useParams();
    const [structure, setStructure] = useState({
        name: "Unloaded",
        description: "Unloaded",
        blocks: [[[0]]],
        palette: [{ id: 'minecraft:air', properties: { type: 0 } }]
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

        fetchBlocks().then();
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

        fetchStructure().then();
    }, [id]);

    const handleDownload = async () => {
        const structureService = new StructureService();
        try {
            await structureService.downloadNBT(id);
        } catch (error) {
            console.error('Error downloading NBT file:', error);
        }
    };

    return (
        <div className="structure-details-container">
            {structure && (
                <div>
                    <h1>{structure.name}</h1>
                    <p>{structure.description}</p>
                </div>
            )}
            <div className="structure-renderer-container">
                <StructureRendererComponent structure={structure.blocks} palette={structure.palette} blocks={blocks} />
            </div>
            <button onClick={handleDownload}>Download NBT</button>
        </div>
    );
}

export default StructureDetailsComponent;