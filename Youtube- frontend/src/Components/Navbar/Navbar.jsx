import React, { useEffect, useState } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import cancel_icon from '../../assets/cancel.png'; // 
const Navbar = ({ setSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChannelAvailable, setIsChannelAvailable] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [uid, setUid] = useState("");
  const [channelData, setChannelData] = useState(null);


  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.clear();
    setUserName("");
    setAvatar("");
    setUid("");
    setIsChannelAvailable(false);
    navigate("/");
  };

  function getData() {
    let token = localStorage.getItem("token");
    if (token == null || token == "" || token == undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      setAvatar(localStorage.getItem("avatar"));
      setUserName(localStorage.getItem("userName"));
      setUid(localStorage.getItem("uid"));

    }

  }

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        // const response = await fetch(`http://localhost:8000/api/video/search/${searchQuery}`);
        const api = await axios.get(`http://localhost:8000/api/video/search/${searchQuery}`);
        const data = api.data;
        // const data = await response.json();

        if (data.success && data.videos.length > 0) {
          navigate('/searchResults', { state: { results: data.videos } });
        } else {
          navigate('/searchResults', { state: { results: [] } });
        }
      } catch (error) {
        console.error('Error while searching:', error);
      }
    }
  };

  const handleCancelSearch = () => {
    setSearchQuery('');
    navigate('/'); // Redirect to home page
  };

  useEffect(() => {
    let uid = localStorage.getItem("uid");
    fetch(`http://localhost:8000/api/channel/getMyChannel/${uid}`).then((value) => {
      value.json().then((data) => {
        if (data["success"] == true) {
          setIsChannelAvailable(true);
          setChannelData(data.channel);
        }
      });
    })
  }, [uid]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();

  })

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          onClick={() => setSidebar((prev) => !prev)}
          src={menu_icon}
          alt=""
        />
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
        <h1>YOU</h1>
        <h1>TUBE</h1>
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img
            src={search_icon}
            alt="Search"
            onClick={handleSearch}
            style={{ cursor: 'pointer' }}
          />
          {searchQuery && (
            <img
              src={cancel_icon}
              alt="Cancel"
              onClick={handleCancelSearch}
              style={{ cursor: 'pointer', marginLeft: '8px' }}
            />
          )}
        </div>
      </div>
      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />


        <div className='auth-buttons'>
          {
            isLoggedIn && <div>
              {isChannelAvailable ? <button onClick={() => {
                navigate('/viewChannel', { replace: true });
              }} className='button-log-in-out'>
                View Channel
              </button> : <Link to='/createChannel' className="button-log-in-out">Create Channel</Link>}
            </div>
          }

          {isLoggedIn && <div className='user-details'>
            <button className='button-log-in-out' onClick={() => handleLogout()}><FiLogOut /> Logout</button>
            <img src={avatar} />
          </div>}
          {!isLoggedIn && <button className='button-log-in-out' onClick={() => {
            navigate('/login', { replace: true });
          }}><FiLogIn /> Login</button>}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;