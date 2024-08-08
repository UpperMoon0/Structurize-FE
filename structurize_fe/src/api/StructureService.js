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

  async getAllStructures() {
    try {
      const response = await this.api.get('/structure/get-all-structures');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async downloadNBT(id, filename) {
    try {
      const response = await this.api.get(`/structure/download-nbt/${id}`, {
        responseType: 'blob'
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create an anchor element and trigger a download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

export default StructureService;