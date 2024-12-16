import React, { useEffect, useState } from 'react';
import './Feed.css';

import thumbnail1 from '../../assets/thumbnail1.png';

import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const Feed = ({ category }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        setError(false);
        try {
            let response;
            if (category === 'All') {
                response = await axios.get('http://localhost:8000/api/video');
            } else {
                response = await axios.get(`http://localhost:8000/api/video/category/${category}`);
            }

            const dataValue = response.data;

            if (dataValue.success === false || !dataValue.videos || dataValue.videos.length === 0) {
                setData([]); // No data available
            } else {
                setData(dataValue.videos); // Set videos data
            }
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    if (isLoading) {
        return <div className="feed-center">Loading...</div>;
    }

    if (error) {
        return <div className="feed-center">No videos available for this category.</div>;
    }

    if (data.length === 0) {
        return <div className="feed-center">No videos available for this category.</div>;
    }

    return (
        <div className="feed">
            {data.map((item, index) => (
                <Link to={`video/${item.category}/${item._id}`} className="card" key={index}>
                    <img src={item.thumbnailUrl || thumbnail1} alt={item.title} />
                    <h2>{item.title}</h2>
                    <h3>{item.category}</h3>
                    <p>
                        {item.views || 0} Views &bull; {moment(item.uploadedDate).fromNow()}
                    </p>
                </Link>
            ))}
        </div>
    );
};

export default Feed;
