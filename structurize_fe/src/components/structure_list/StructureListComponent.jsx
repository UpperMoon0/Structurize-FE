import {useContext, useEffect, useState} from 'react';
import StructureService from "../../api/StructureService.js";
import StructureCardComponent from "./StructureCardComponent.jsx";
import './StructureListComponent.css';
import {AuthContext} from "../../context/AuthContext.jsx";
import PropTypes from "prop-types";

function StructureListComponent() {
    const [structureList, setStructureList] = useState({ structures: [] });
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const structureService = new StructureService();
        const fetchStructures = async () => {
            try {
                const fetchedStructureListData = await structureService.getStructureList(isLoggedIn);
                setStructureList(fetchedStructureListData);
            } catch (error) {
                console.error('Error fetching structures:', error);
            }
        };

        fetchStructures().then();
    }, [isLoggedIn]);

    return (
        <div className="container">
            <div className="list">
                {structureList.structures.map((structureListItem) => (
                    <StructureCardComponent key={structureListItem.structureId} structureListItem={structureListItem} />
                ))}
            </div>
        </div>
    );
}

StructureListComponent.propTypes = {
    structureList: PropTypes.shape({
        structures: PropTypes.arrayOf(
            PropTypes.shape({
                structureId: PropTypes.string,
                structureName: PropTypes.string,
                updatedAt: PropTypes.string,
                authorName: PropTypes.string,
                isAuthor: PropTypes.bool,
                isLiked: PropTypes.bool,
                likeCount: PropTypes.number,
                commentCount: PropTypes.number
            })
        ).isRequired
    })
};

export default StructureListComponent;