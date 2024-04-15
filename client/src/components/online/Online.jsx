import React from 'react';
import "./online.css"

const Online = ({user}) => {
  return (
 <li className="rightBarFriend">
            <div className="rightBarProfileImgContainer">
              <img className='rightBarProfileImg' src={user.profilePicture} alt="" />
              <span className="rightBarOnline"></span>
            </div>
            <span className="rightBarUserName">{user.userName} </span>
          </li>
  )
}

export default Online
