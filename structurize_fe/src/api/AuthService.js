import axios from 'axios';

class StructureService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_BE_API_URL
        });
    }

    async register(email, username, password, confirmPassword) {
        // Check if passwords match
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        try {
            const response = await this.api.post(`/auth/register`, {email: email, username: username, password: password});
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const response = await this.api.post(`/auth/login`, {email: email, password: password});
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

export default StructureService;