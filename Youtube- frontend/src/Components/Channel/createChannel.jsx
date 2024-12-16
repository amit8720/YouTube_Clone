import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createChannel.css';
import Sidebar from '../../Components/Sidebar/Sidebar'
import axios from 'axios';
const CreateChannel = ({ sidebar }) => {
    const navigate = useNavigate();
    const [channelName, setChannelName] = useState('');
    const [owner, setOwner] = useState('');
    const [description, setDescription] = useState('');
    const [channelLogo, setChannelLogo] = useState('');
    const [channelBanner, setChannelBanner] = useState('');
    const [error, setError] = useState(null);
    const [isChannelAvailable, setIsChannelAvailable] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const owner = localStorage.getItem("uid");
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        const payload = {
            channelName,
            owner,
            description,
            channelLogo,
            channelBanner
        };

        try {
            const response = await axios.post('http://localhost:8000/api/channel/createChannel', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token in Authorization header
                }
            });

            if (response.status === 200 || response.status === 201) {
                const data = response.data;
                alert('Channel created successfully!');
                localStorage.setItem("channelId", data._id);
                setIsChannelAvailable(true);
                navigate('/', { replace: true });
                window.location.reload();

            } else {
                setError(response.data.message || 'Failed to create channel. Please try again.');
            }
        } catch (err) {
            console.error('Error creating channel:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <Sidebar sidebar={sidebar} />
            <div className={`container ${sidebar ? "" : 'large-container'}`}>
                <div className="create-channel-container">
                    <h2>Create Channel</h2>
                    <form onSubmit={handleSubmit} className="create-channel-form">
                        <div className="form-group">
                            <label htmlFor="channelName">Channel Name</label>
                            <input
                                type="text"
                                id="channelName"
                                value={channelName}
                                onChange={(e) => setChannelName(e.target.value)}
                                placeholder="Enter channel name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter channel description"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="channelLogo">Channel Logo (URL)</label>
                            <input
                                type="text"
                                id="channelLogo"
                                value={channelLogo}
                                onChange={(e) => setChannelLogo(e.target.value)}
                                placeholder="Enter logo URL"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="channelBanner">Channel Banner (URL)</label>
                            <input
                                type="text"
                                id="channelBanner"
                                value={channelBanner}
                                onChange={(e) => setChannelBanner(e.target.value)}
                                placeholder="Enter banner URL"
                                required
                            />
                        </div>
                        <button type="submit" className="create-channel-button" onClick={() => setIsChannelAvailable(!isChannelAvailable)}>Create Channel</button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateChannel;
