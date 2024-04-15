import React, { useEffect, useState } from 'react';
import "./profile.css"
import TopBar from '../../components/topBar/TopBar';
import SideBar from '../../components/sideBar/SideBar';

import RightBar from '../../components/rightBar/RightBar';
import Feed from '../../components/feed/Feed';
import axios from "axios"
import { useParams } from 'react-router';
const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  

     useEffect(() => {
       const fetchPosts = async () => {
         const res = await axios.get(`/user?username=${username}`)
         setUser(res.data)
       };
    fetchPosts();
     }, [username]);
  
  return (
    <>
         <TopBar />
      <div className="profileContainer">
              <SideBar />
              <div className="profileRight">
                  <div className="profileTop">
                      <div className="profileCover">
                            <img src= {user.coverPic ?PF + user.coverPic : PF+"post/sea.jpg"} alt="" className="profileCoverImg" />
                      <img src= {user.profilePic ? PF+user.profilePic : PF+ "avatar.png"} alt="" className="profileUserImg" />
                      </div>
                      <div className="profileInfo">
              <h4 className='profileInfoName'>{username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
                      </div>
                  </div>
          <div className="profileBottom">
            
            <Feed username={username} />
            <RightBar user={ user} />
                  </div>
              </div>
         </div>
    </>
  )
}

export default Profile
