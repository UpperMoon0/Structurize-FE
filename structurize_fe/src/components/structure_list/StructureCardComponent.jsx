import { useEffect } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import './StructureListComponent.css';

function StructureCardComponent({ structure }) {

    useEffect(() => {

    }, []);

    return (
        <Link to={`/structure-details/${structure.id}`} className="card-wrapper">
            <h1>{structure.name}</h1>
            <p>{structure.description}</p>
        </Link>
    );
}

StructureCardComponent.propTypes = {
    structure: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default StructureCardComponent;