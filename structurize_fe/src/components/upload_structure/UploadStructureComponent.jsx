import { useState } from 'react';
import StructureService from '../../api/StructureService.js';
import './UploadStructureComponent.css';

function UploadStructureComponent() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const structureService = new StructureService();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('file', file);

        try {
            const response = await structureService.uploadStructureAsNBT(name, description, file);
            console.log('Structure created:', response);
        } catch (error) {
            console.error('Error creating structure:', error);
        }
    };

    return (
        <div className="upload-structure-container">
            <h1>Upload Structure</h1>
            <form onSubmit={handleSubmit} className="upload-structure-form">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="file">File:</label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UploadStructureComponent;