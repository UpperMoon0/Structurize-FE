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

  async uploadStructureAsNBT(name, description, file) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);

    const token = localStorage.getItem('jwtToken');

    try {
      const response = await this.api.post('/structure/create-structure-from-nbt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating structure:', error);
      throw error;
    }
  }

  async downloadStructureAsNBT(id, filename) {
    const token = localStorage.getItem('jwtToken');

    try {
      const response = await this.api.get(`/structure/download-nbt/${id}`, {
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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

  async getStructureList(isLoggedIn) {
    try {
      const headers = {};
      if (isLoggedIn) {
        const token = localStorage.getItem('jwtToken');
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await this.api.get('/structure/get-structure-list', { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

export default StructureService;