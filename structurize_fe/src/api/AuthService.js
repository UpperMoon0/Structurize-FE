import axios from 'axios';

class AuthService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_BE_API_URL
        });
    }

    async register(email, username, password, confirmPassword) {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        try {
            const response = await this.api.post(`/auth/register`, { email, username, password });
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async login(email, password, setIsLoggedIn) {
        try {
            const response = await this.api.post(`/auth/login`, { email, password });
            const token = response.data;
            localStorage.setItem('jwtToken', token);
            setIsLoggedIn(true);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    logout(setIsLoggedIn) {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
    }

    isLoggedIn() {
        return !!localStorage.getItem('jwtToken');
    }
}

export default AuthService;