import { useEffect } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import heartOffIcon from '../../assets/heart_off_icon.png';
import commentIcon from '../../assets/comment_icon.png';
import structureThumbnail from '../../assets/default_structure_thumbnail.png';
import './StructureCardComponent.css';

function StructureCardComponent({ structureListItem }) {

    useEffect(() => {

    }, []);

    return (
        <Link to={`/structure-details/${structureListItem.structureId}`} className="structure-card-wrapper">
            <div className="structure-card-header">
                <h1>
                    {structureListItem.structureName}
                </h1>
                <h2>
                    by {structureListItem.authorName}
                </h2>
                <p>
                    Last updated: {timeAgo(structureListItem.updatedAt)}
                </p>
            </div>
            <img className="structure-card-thumbnail" src={structureThumbnail} alt="Structure thumbnail"/>
            <div className="structure-card-footer">
                <div>
                    <img src={heartOffIcon} alt="Like"/>
                    {structureListItem.likeCount}
                </div>
                <div>
                    <img src={commentIcon} alt="Comments"/>
                    {structureListItem.commentCount}
                </div>
            </div>
        </Link>
    );
}

StructureCardComponent.propTypes = {
    structureListItem: PropTypes.shape({
        structureId: PropTypes.string,
        structureName: PropTypes.string,
        updatedAt: PropTypes.string,
        authorName: PropTypes.string,
        isLiked: PropTypes.bool.isRequired,
        likeCount: PropTypes.number.isRequired,
        commentCount: PropTypes.number
    }).isRequired
};

export default StructureCardComponent;

function timeAgo(date) {
    const now = new Date();
    const updatedDate = new Date(date);
    const diffInSeconds = Math.floor((now - updatedDate) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}