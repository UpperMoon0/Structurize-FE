import {useState, useEffect, useContext, useCallback, useMemo} from 'react';
import { useParams } from 'react-router-dom';
import StructureService from '../../api/StructureService.js';
import BlockService from '../../api/BlockService.js';
import StructureRendererComponent from "./StructureRendererComponent.jsx";
import './StructureDetailsComponent.css';
import { AuthContext } from "../../context/AuthContext.jsx";
import PropTypes from "prop-types";
import StructureListComponent from "../structure_list/StructureListComponent.jsx";
import structureThumbnail from "../../assets/default_structure_thumbnail.png";
import heartOff from "../../assets/heart_off_icon.png";
import StructureCommentService from "../../api/StructureCommentService.js";

function StructureDetailsComponent() {
    const { id } = useParams();
    const [structureDetails, setStructureDetails] = useState({
        structure: {
            name: '',
            description: '',
            blocks: [[[0]]],
            palette: [{ id: 'minecraft:air', properties: { type: 0 } }],
            download: 0,
            createdAt: '',
            updatedAt: ''
        },
        authorName: '',
        likeCount: 0,
    });
    const [blocks, setBlocks] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);
    const structureService = useMemo(() => new StructureService(), []);
    const commentService = useMemo(() => new StructureCommentService(), []);

    useEffect(() => {
        const blockService = new BlockService();
        const fetchBlocks = async () => {
            try {
                const fetchedBlocks = await blockService.getBlocks();
                setBlocks(fetchedBlocks);
            } catch (error) {
                console.error('Error fetching blocks:', error);
            }
        };

        fetchBlocks().then();
    }, []);

    const fetchStructureDetails = useCallback(async () => {
        try {
            const fetchedStructureDetails = await structureService.getStructureDetails(id);
            setStructureDetails(fetchedStructureDetails);
        } catch (error) {
            console.error('Error fetching structure:', error);
        }
    }, [id, structureService]);

    const fetchComments = useCallback(async () => {
        try {
            const fetchedComments = await commentService.getCommentsByStructureId(id);
            const sortedComments = fetchedComments.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setComments(sortedComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [commentService, id]);

    useEffect(() => {
        fetchStructureDetails().then();
        fetchComments().then();
    }, [fetchStructureDetails, fetchComments, id]);

    const handleDownload = async () => {
        try {
            const filename = structureDetails.name.replace(/[^a-zA-Z0-9_\s]/g, '').replace(/\s+/g, '_').toLowerCase() + '.nbt';
            await structureService.downloadStructureAsNBT(id, filename);
        } catch (error) {
            console.error('Error downloading NBT file:', error);
        }
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (!newComment.trim()) return;

        try {
            await commentService.createComment(id, newComment);
            setNewComment('');
            await fetchComments();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    return (
        <div className="structure-details-container">
            <div className="structure-details-header">
                <img src={structureThumbnail} alt="Structure image"/>
                <div className="sd-header-inner-div">
                    <div className="sd-header-inner-div-1">
                        <h1>{structureDetails.structure.name}</h1>
                        <h3>Author: {structureDetails.authorName}</h3>
                        <p>Size: {structureDetails.structure.blocks.length}x{structureDetails.structure.blocks[0].length}x{structureDetails.structure.blocks[0][0].length}</p>
                        <p>Created: {new Date(structureDetails.structure.createdAt).toLocaleString()}</p>
                        <p>Last updated: {new Date(structureDetails.structure.updatedAt).toLocaleString()}</p>
                    </div>
                    <div className="sd-header-inner-div-2">
                        <h2>Download</h2>
                        {isLoggedIn ? (
                            <button onClick={handleDownload}>.nbt</button>
                        ) : (
                            <p>You need to login to download the structure</p>
                        )}
                    </div>
                    <div className="sd-header-inner-div-3">
                        <button>
                            <img src={heartOff} alt="Like button"/>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <h2>Description</h2>
                <p>{structureDetails.structure.description}</p>
            </div>
            <div>
                <h2>3D Render</h2>
                <StructureRendererComponent structure={structureDetails.structure.blocks}
                                            palette={structureDetails.structure.palette} blocks={blocks}/>
            </div>
            <div>
                <h2>Comments ({comments.length})</h2>
                <div className="comment-box">
                    {isLoggedIn && (
                        <form onSubmit={handleCommentSubmit} className="comment-form">
                        <textarea value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  placeholder="Add a comment"
                                  required
                        />
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </div>
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <div className="comment-top">
                            <div className="comment-top-left">
                                <h3>{comment.authorName}</h3>
                            </div>
                            <div className="comment-top-right">
                                <p>Created: {new Date(comment.createdAt).toLocaleString()}</p>
                                <p>Last updated: {new Date(comment.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

StructureListComponent.propTypes = {
    structureDetails: PropTypes.shape({
        structure: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
            blocks: PropTypes.arrayOf(
                PropTypes.arrayOf(
                    PropTypes.arrayOf(
                        PropTypes.shape({
                            id: PropTypes.string,
                            properties: PropTypes.object
                        })
                    )
                )
            ),
            palette: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string,
                    properties: PropTypes.object
                })
            ),
            download: PropTypes.number,
            createdAt: PropTypes.string,
            updatedAt: PropTypes.string
        }),
        authorName: PropTypes.string,
        likeCount: PropTypes.number,
    })
};

export default StructureDetailsComponent;