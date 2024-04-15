import React, { useContext } from 'react'
import "./topBar.css"
import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const TopBar = () => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to="/" className='linkText'> 
        <span className='logo'>RatanSocial</span>
        </Link>
      </div>
      
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className='searchIcon' />
          <input type="text" placeholder="Search for friend and video,post..." className="searchInput"/>
      </div>
      </div> 

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage </span>
          <span className="topbarLink">Timeline </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">
              1
            </span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">
              4
            </span>
          </div>
          <div className="topbarIconItem">
            <Notifications/>
            <span className="topbarIconBadge">
              8
            </span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`} >
        <img src={user.profilePic ? PF + user.profilePic : PF + "avatar.png"} alt="" className='topbarImg' />
        </Link>
        
      </div> 

    </div>
  )
}

export default TopBar
