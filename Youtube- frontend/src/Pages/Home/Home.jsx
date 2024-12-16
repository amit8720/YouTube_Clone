import React, { useState } from 'react'
import './Home.css'
import Feed from '../../Components/Feed/Feed'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Chip from '../../Components/Chip/Chip'

const Home = ({ sidebar }) => {

  const [category, setCategory] = useState(0);

  const chipDetails = [
    {
      title: "All",
      isSelected: false
    },
    {
      title: "Songs",
      isSelected: false
    },
    {
      title: "Podcasts",
      isSelected: false
    },
    {
      title: "Infotainment",
      isSelected: false
    },
    {
      title: "Food",
      isSelected: false
    },
    {
      title: "Gaming",
      isSelected: false
    },
    {
      title: "Vlogs",
      isSelected: false
    },
    {
      title: "Spiritual",
      isSelected: false
    },
    {
      title: "Comedy",
      isSelected: false
    },
  ];

  const [selectedType, setSelectedType] = useState("All");

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ? "" : 'large-container'}`}>
        <div className="chips_list">
          {chipDetails.map((element, i) => <a onClick={() => { setSelectedType(element.title) }}><Chip key={i} isSelected={selectedType == element.title} title={element.title} /></a>)}
        </div>
        <Feed category={selectedType} />
      </div>
    </>
  )
}

export default Home