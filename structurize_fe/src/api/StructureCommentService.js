import axios from 'axios';

class StructureCommentService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_BE_API_URL
        });
    }

    async createComment(structureId, content) {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await this.api.post('/structure-comment/create',
                { structureId: structureId, content: content },
                {headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }
}

export default StructureCommentService;