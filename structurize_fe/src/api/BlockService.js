import axios from 'axios';

class BlockService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_BE_API_URL
        });
    }

    async getBlocks() {
        try {
            const response = await this.api.get(`/block/get-blocks`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

export default BlockService;