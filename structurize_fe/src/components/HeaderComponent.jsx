import './HeaderComponent.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

function HeaderComponent() {
    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
        <div className="header">
            <div className="header-left">
                <Link to="/">Structure list</Link>
            </div>
            <div className="header-middle">
                <h1>Structurize</h1>
            </div>
            <div className="header-right">
                {isLoggedIn ? (
                    <>
                        <Link to="/upload-structure">Upload structure</Link>
                        <a href="/" onClick={logout}>Logout</a>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </div>
    );
}

export default HeaderComponent;