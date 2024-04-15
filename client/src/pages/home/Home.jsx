import React from 'react'
import "./home.css"
import TopBar from '../../components/topBar/TopBar'
import SideBar from '../../components/sideBar/SideBar'
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightBar/RightBar'

const Home = () => {
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <SideBar />
        <Feed />
        <RightBar/>
      </div>
    </>
  )
}

export default Home
