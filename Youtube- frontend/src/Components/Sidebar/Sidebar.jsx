import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import home from '../../assets/home.png';
import game_icon from '../../assets/game_icon.png';
import shorts from '../../assets/shorts.png';
import subs from '../../assets/subscription.png';
import game from '../../assets/game_icon.png';
import clock from '../../assets/clock.png';
import setting from '../../assets/gear.png';
import history from '../../assets/history.png';
import help from '../../assets/help.png';

const Sidebar = ({ sidebar, category, setCategory }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleHomeClick = () => {
    navigate('/'); // Navigate to home page
    setCategory(0); // Optionally reset category to 0 when home is clicked
  };

  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`} style={{ marginLeft: '2%', width: '15%', position: 'fixed' }}>

      <div className='sortcut-links'>
        <div className={`side-link`} onClick={handleHomeClick} style={{ paddingTop: '17px' }}>
          <img src={home} alt='' /><p>Home</p>
        </div>
        <div className={`side-link`} onClick={() => { }}>
          <img src={game} alt='' /><p>Gaming</p>
        </div>
        <div className={`side-link`} onClick={() => { }}>
          <img className="ss" src={shorts} alt='' /><p>Shorts</p>
        </div>
        <div className={`side-link`} onClick={() => { }}>
          <img src={subs} alt='' /><p>Subscription</p>
        </div>
        <div className={`side-link`} onClick={() => { }}>
          <img src={clock} alt='' /><p>Watch later</p>
        </div>
        <div className={`side-link`} onClick={() => { }}>
          <img src={setting} alt='' /><p>Settings</p>
        </div>
        <div className={`side-link`} onClick={() => { }}>
          <img src={history} alt='' /><p>History</p>
        </div>
        <div className={`side-link`} onClick={() => { }}>
          <img src={help} alt='' /><p>Help</p>
        </div>


      </div>

    </div>
  );
};

export default Sidebar;
