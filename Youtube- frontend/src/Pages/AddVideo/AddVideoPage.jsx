import React, { useState } from 'react';
import './AddVideoPage.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const AddVideoPage = ({ sidebar }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();





    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const payload = {
            title,
            description,
            videoUrl,
            thumbnailUrl,
            category,
            uploader: localStorage.getItem('uid'),
            channelId: localStorage.getItem("channel"),
        };

        try {
            const token = localStorage.getItem('token'); // Retrieve the token

            const response = await axios.post(
                'http://localhost:8000/api/video/addVideo',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include token
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                setSuccessMessage('Video added successfully!');
                setTitle('');
                setDescription('');
                setVideoUrl('');
                setThumbnailUrl('');
                setCategory('');
                navigate('/viewChannel');
            } else {
                setError(response.data.message || 'Failed to add video. Please try again.');
            }
        } catch (err) {
            console.error('Error adding video:', err);
            setError(err.response?.data?.message || 'An error occurred. Please try again later.');
        }
    };


    return (
        <>
            <Sidebar sidebar={sidebar} />
            <div className={`container ${sidebar ? '' : 'large-container'}`}>
                <div className="add-video-container">
                    <h2>Add Video</h2>
                    <form onSubmit={handleSubmit} className="add-video-form">
                        <div className="form-group">
                            <label htmlFor="title">Video Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter video title"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter video description"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="videoUrl">Video URL</label>
                            <input
                                type="text"
                                id="videoUrl"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                placeholder="Enter video URL"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="thumbnailUrl">Thumbnail URL</label>
                            <input
                                type="text"
                                id="thumbnailUrl"
                                value={thumbnailUrl}
                                onChange={(e) => setThumbnailUrl(e.target.value)}
                                placeholder="Enter thumbnail URL"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input
                                type="text"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Enter video category"
                                required
                            />
                        </div>
                        <button type="submit" className="add-video-button">
                            Add Video
                        </button>
                        {error && <p className="error-message">{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddVideoPage;
