import './HeaderComponent.css';

function HeaderComponent() {
    return (
        <div className="header">
            <h1>Structurize</h1>
            <nav>
                <ul>
                    <li><a href="/">Structure list</a></li>
                    <li><a href="/upload-structure">Upload structure</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default HeaderComponent;