import { useEffect } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import './structure-list.css';

StructureCardComponent.propTypes = {
    structure: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

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

export default StructureCardComponent;