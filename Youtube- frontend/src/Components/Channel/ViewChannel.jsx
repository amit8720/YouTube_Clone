import React, { useEffect, useState } from "react";
import "./ViewChannel.css";  // Make sure to add this CSS for styling.

import Sidebar from '../../Components/Sidebar/Sidebar'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom'; // For redirecting after deletion

const ViewChannel = ({ sidebar }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [channelData, setChannelData] = useState(null);
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate(); // For redirection after channel deletion

    useEffect(() => {
        let uid = localStorage.getItem("uid");

        axios.get(`http://localhost:8000/api/channel/getMyChannel/${uid}`)
            .then((response) => {
                if (response.data.success === true) {
                    setChannelData(response.data.channel);
                    getData(response.data.channel._id);
                    localStorage.setItem("channel", response.data.channel._id);
                }
            })
            .catch((error) => {
                console.error('Error fetching channel data:', error);
            });
    }, []);


    function getData(id) {
        axios.get(`http://localhost:8000/api/video/channelVideos/${id}`)
            .then((response) => {
                if (response.data.success === true) {
                    setVideos(response.data.videos);
                }
            })
            .catch((error) => {
                console.error('Error fetching channel videos:', error);
            });
    }

    const addVideo = () => {
        navigate('/addVideo');
    }
    const toggleSubscribe = () => {
        setIsSubscribed(!isSubscribed);
    };

    // Function to handle channel deletion
    const deleteChannel = async () => {
        const uid = localStorage.getItem("uid");
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(`http://localhost:8000/api/channel/deleteChannel/${channelData._id}/${uid}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include token in Authorization header
                    }
                }
            );

            if (response.data.success) {
                alert("Channel deleted successfully.");
                navigate("/");
                window.location.reload();
                // Redirect to the home page or any other page after deletion
            } else {
                alert("Error deleting the channel.");
            }
        } catch (error) {
            console.error("Error deleting the channel:", error);
            alert("An error occurred while deleting the channel.");
        }
    };

    if (channelData == null) {
        return (
            <center>Loading...</center>
        );
    }

    return (
        <>
            <Sidebar sidebar={sidebar} />
            <div className={`container ${sidebar ? "" : 'large-container'}`}>
                <div className="channel-container">
                    {/* Channel Banner */}
                    <div className="banner">
                        <div className="profile">
                            <img
                                src={channelData.channelLogo}
                                alt="Profile"
                                className="profile-pic"
                            />
                            <div className="profile-details">
                                <h1>{channelData.channelName}</h1>
                                <p>{channelData.subscribers.length} subscribers • {channelData.videos.length} videos</p>
                                <p>
                                    {channelData.description}
                                </p>
                            </div>
                            <button
                                className="subscribe-button"
                                onClick={addVideo}
                            >
                                Add Videos
                            </button>
                            <button
                                className={`subscribe-button ${isSubscribed ? "subscribed" : ""}`}
                                onClick={toggleSubscribe}
                            >
                                {isSubscribed ? "Subscribed" : "Subscribe"}
                            </button>

                            {/* Delete Channel Button */}
                            <button
                                className="delete-button"
                                onClick={deleteChannel}
                            >
                                Delete Channel
                            </button>
                        </div>
                    </div>

                    {/* Video Grid Section */}
                    <div className="video-grid">
                        {videos.map((video) => (
                            <div className="video-card" key={video._id}>
                                <img
                                    src={video.thumbnailUrl}
                                    alt={video.title}
                                    className="video-thumbnail"
                                />
                                <h3>{video.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewChannel;
