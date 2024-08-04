import axios from 'axios';

class StructureService {
  constructor() {
    this.api = axios.create({
        baseURL: import.meta.env.VITE_BE_API_URL
    });
  }

  async getStructureById(id) {
    try {
      const response = await this.api.get(`/structure/get-structure?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

export default StructureService;