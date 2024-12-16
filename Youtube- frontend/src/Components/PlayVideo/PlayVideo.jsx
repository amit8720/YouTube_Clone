
import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import deletee from '../../assets/delete.png';
import edit from '../../assets/pen.png';

const PlayVideo = () => {
    const { videoId } = useParams();

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [comment, setComment] = useState('');

    // Function to fetch video data
    const fetchVideoData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/video/${videoId}`);
            setApiData(response.data.video);
        } catch (error) {
            console.error('Error fetching video data:', error);
        }
    };

    // Function to fetch other channel and comment data
    const fetchOtherData = async () => {
        try {
            const channelResponse = await axios.get(`http://localhost:8000/api/channel/${apiData.channelId}`);
            setChannelData(channelResponse.data.channel);

            // Call fetchComments after the channel data is fetched
            fetchComments();
        } catch (error) {
            console.error('Error fetching other data:', error);
        }
    };

    // Fetch comment data
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/comment/videoComments/${videoId}`);
            if (response.data.success) {
                setCommentData(response.data.comments);
            } else {
                setCommentData([]);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            setCommentData([]);
        }
    };

    // Handle like button click
    const likeVideo = async () => {
        const uid = localStorage.getItem('uid');
        const token = localStorage.getItem('token');
        if (!uid) {
            alert('Please login to like the video');
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8000/api/video/likeVideo/${videoId}`,
                { uId: uid }, // The payload to be sent in the request body
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include token in Authorization header
                    }
                }
            );

            if (response.data.success) {
                // Update the video data after like
                fetchVideoData();
            } else {
                alert('Error liking the video');
            }
        } catch (error) {
            console.error('Error liking video:', error);
            alert('An error occurred while liking the video');
        }
    };

    const dislikeVideo = async () => {
        const uid = localStorage.getItem('uid');
        const token = localStorage.getItem('token');
        if (!uid) {
            alert('Please login to dislike the video');
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8000/api/video/dislikeVideo/${videoId}`,
                { uId: uid }, // The payload to be sent in the request body
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include token in Authorization header
                    }
                }
            );

            if (response.data.success) {
                // Update the video data after dislike
                fetchVideoData();
            } else {
                alert('Error disliking the video');
            }
        } catch (error) {
            console.error('Error disliking video:', error);
            alert('An error occurred while disliking the video');
        }
    };

    // Fetch video data when videoId changes
    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    // Fetch other data (channel and comments) when video data is available
    useEffect(() => {
        if (apiData) {
            fetchOtherData();
        }
    }, [apiData]);

    // Function to add a comment
    const addComment = async () => {
        let uid = localStorage.getItem('uid');
        if (!uid) {
            alert('Please login before commenting');
        } else if (comment.trim().length === 0) {
            alert('Please enter a valid comment');
        } else {
            try {
                await axios.post('http://localhost:8000/api/comment/addComment', {
                    description: comment,
                    owner: uid,
                    video: videoId,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // After successful comment addition, fetch updated comments
                fetchComments();
                setComment('');
                fetchVideoData();
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    // Function to update a comment
    const updateComment = async () => {
        const uid = localStorage.getItem('uid');
        if (!uid) {
            alert('Please login to edit the comment');
            return;
        }

        if (comment.trim().length === 0) {
            alert('Please enter a valid comment');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8000/api/comment/updateComment/${editingCommentId}/${videoId}/${uid}`, {
                description: comment,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                fetchComments(); // Refetch the comments after updating
                setEditingCommentId(null); // Clear the editing state
                setComment(''); // Clear the input field
            } else {
                alert('Failed to update the comment');
            }
        } catch (error) {
            console.error('Error updating comment:', error);
            alert('Failed to update the comment');
        }
    };

    // Function to edit a comment
    const handleEdit = (commentId, currentDescription) => {
        setEditingCommentId(commentId); // Set the comment being edited
        setComment(currentDescription); // Prefill the comment input with current comment text
    };

    // Function to delete a comment
    const deleteComment = async (commentId, userId) => {
        const uid = localStorage.getItem('uid');
        if (!uid) {
            alert('Please login to delete the comment');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8000/api/comment/deleteComment/${commentId}/${videoId}/${uid}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                fetchComments();
                fetchVideoData();
            } else {
                console.error('Failed to delete the comment:', response.data.message || response.statusText);
                alert('Failed to delete the comment');
            }
        } catch (error) {
            console.error('Error deleting the comment:', error);
            alert('An error occurred while deleting the comment');
        }
    };

    return (
        <div className='play-video'>
            {apiData && <iframe src={`${apiData.videoUrl}`} allowFullScreen></iframe>}
            <h3>{apiData ? apiData.title : 'Title Here'}</h3>
            <div className='play-video-info'>
                <p>
                    {apiData ? value_converter(apiData.views) : '0'} Views &bull;
                    {apiData ? moment(apiData.uploadedDate).fromNow() : ''}
                </p>
                <div>
                    <span onClick={likeVideo}>
                        <img src={like} alt='' />
                        {apiData ? value_converter(apiData.likes.length) : 0}
                    </span>
                    <span onClick={dislikeVideo}>
                        <img src={dislike} alt='' />
                        {apiData ? value_converter(apiData.dislikes.length) : 0}
                    </span>
                    <span>
                        <img src={share} alt='' /> Share
                    </span>
                    <span>
                        <img src={save} alt='' /> Save
                    </span>
                </div>
            </div>
            <hr />
            <div className='publisher'>
                <img src={channelData ? channelData.channelLogo : ''} alt='' />
                <div>
                    <p>{channelData ? channelData.channelName : ''}</p>
                    <span>
                        {channelData ? value_converter(channelData.subscribers.length) : '0'} Subscribers
                    </span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className='vid-description'>
                <p>{apiData ? apiData.description.slice(0, 250) : 'Description Here'}</p>
                <hr />
                <h4>{apiData ? value_converter(apiData.comments.length) : 0} Comments</h4>

                <div className='comment-box'>
                    <input
                        className='comment-field'
                        placeholder='Add Comment'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    {editingCommentId ? (
                        <button onClick={updateComment}>Update</button>
                    ) : (
                        comment !== '' && <button onClick={addComment}>Comment</button>
                    )}
                </div>

                {commentData.map((item, index) => (
                    <div key={index} className='comment'>
                        <img src={item.owner} alt='' />
                        <div>
                            <h3>
                                {item.owner} <span>{moment(item.createdAt).fromNow()}</span>
                            </h3>
                            <p>{item.description}</p>

                            <div className='comment-action'>
                                <img src={like} alt='' />
                                <span>{value_converter(0)}</span>
                                <img src={dislike} alt='' />
                                {item.owner === localStorage.getItem('uid') && (
                                    <button onClick={() => deleteComment(item._id)}><img src={deletee} alt='' /></button>
                                )}
                                {item.owner === localStorage.getItem('uid') && (
                                    <button onClick={() => handleEdit(item._id, item.description)}><img src={edit} alt='' /></button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayVideo;
