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

  async createStructureFromNBT(name, description, file) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);

    try {
      const response = await this.api.post('/structure/create-structure-from-nbt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating structure:', error);
      throw error;
    }
  }
}

export default StructureService;