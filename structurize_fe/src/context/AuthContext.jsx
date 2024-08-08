import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../api/AuthService';

const AuthContext = createContext(false);

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const authService = useMemo(() => new AuthService(), []);

    const login = async (email, password) => {
        await authService.login(email, password, setIsLoggedIn);
    };

    const logout = () => {
        authService.logout(setIsLoggedIn);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };