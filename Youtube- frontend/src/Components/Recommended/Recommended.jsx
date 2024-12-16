import React, { useEffect, useState } from 'react'
import './Recommended.css'
import axios from 'axios';
import { Link } from 'react-router-dom'

import { value_converter } from '../../data'

const Recommended = ({ categoryId }) => {

  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideo_url = `http://localhost:8000/api/video/category/${categoryId}`;

    try {
      const response = await axios.get(relatedVideo_url);
      setApiData(response.data.videos);
    } catch (error) {
      console.error('Error fetching related videos:', error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className='recommended'>
      {apiData.map((item, index) => {
        return (
          <Link to={`/video/${item.category}/${item._id}`} key={index} className='side-video-list'>
            <img src={item.thumbnailUrl} alt='' />
            <div className='vid-info'>
              <h4>{item.title}</h4>
              <p>{item.category}</p>
              <p>{value_converter(item.views)}Views</p>
            </div>
          </Link>
        )
      })}


    </div>
  )
}

export default Recommended