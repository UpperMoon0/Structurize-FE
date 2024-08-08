import { useState } from 'react';
import AuthService from '../../api/AuthService';
import './LoginComponent.css';

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authService = new AuthService();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await authService.login(email, password);
            console.log('Login successful:', response);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginComponent;