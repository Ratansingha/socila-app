import React, {  useEffect, useState } from 'react';
import "./rightBar.css";
import { Users } from '../../dummyData';
import Online from '../online/Online';
import axios from "axios";

// import { Add } from "@mui/icons-material";

const RightBar = ({ user }) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/user/friends/" + user._id);

        setFriends(friendList.data);
      } catch (error) {
        console.log(error)
      }
    }
    getFriends();
  }, [user]);
   
  const HomeRightBar = () => {
    return (
      <>
        {/* {user.username !== currentUser.username && (
          <button>Follow <Add/> </button>
        )} */}
      <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthImg" />
          <span className="birthdayText"> <b> Pola Foster </b>and <b>3 Other friends</b> have birthday today </span>
        </div>
        <img src="./assets/celebration.jpg" alt="" className="rightBarAd" />
        <h4 className="rightBarTitle">Online Friends</h4>
        <ul className="rightBarFriendsList">
          {Users.map(u => (
            <Online key={u.id } user={u} />
          ))}         
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {
    return (
      <>
        <h4 className='rightBarTitle'>User Informations</h4>
        <div className="rightBarInfo">
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">City: </span>
            <span className="rightBarInfoValue">{ user.city}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">From :</span>
            <span className="rightBarInfoValue">{ user.from}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">Relationship :</span>
            <span className="rightBarInfoValue">{user.relationship=== 1 ? "single" : user.relationship===2 ? "Married" : ""}</span>
          </div>
        </div>
        <h4 className='rightBarUserFriend'>User Friends</h4>
        <div className="rightBarFollowings">

          {friends.map((friend) => ( 
          <div className="following">
            <img src={friend.profilePic ? PF + friend.profilePic : PF + "avatar.png" } alt="" className="followingImg" />
              <span className="followingName">{friend.username}</span>             
            </div>
          ))}
          
        </div>
      </>
    )
  }
  return (
    <div className='rightBar'>
      <div className="rightWrapper">
   { user ?   <ProfileRightBar/>:<HomeRightBar/>}
      </div>
    </div>
  )
}

export default RightBar
