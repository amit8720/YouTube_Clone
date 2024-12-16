import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Components/Login/Login'
import Channel from './Components/Channel/createChannel'
import Video from './Pages/Video/Video'
import ViewChannel from './Components/Channel/ViewChannel'
import AddVideo from './Pages/AddVideo/AddVideoPage'
import SearchResults from './Components/Search/SearchResults'

const App = () => {
  const [sidebar, setSidebar] = useState(true);


  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
        <Route path='/login' element={<Login sidebar={sidebar} />} />
        <Route path='/createChannel' element={<Channel sidebar={sidebar} />} />
        <Route path='/viewChannel' element={<ViewChannel sidebar={sidebar} />} />
        <Route path='/searchResults' element={<SearchResults sidebar={sidebar} />} />
        <Route path='/addVideo' element={<AddVideo sidebar={sidebar} />} />

      </Routes>
    </div>
  )
}
export default App 