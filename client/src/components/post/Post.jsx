import React, { useContext, useEffect, useState } from 'react';
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js"
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Post = ({ post }) => {

  const [like, setLike] = useState(post.likes.length);
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState({});

  const {user:currentUser}=useContext(AuthContext)

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = () => {
    try {
      axios.put("/post/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {
      console.log(error)
    }
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
  }
useEffect(() => {
  setIsLike(post.likes.includes(currentUser._id));
}, [currentUser._id,post.likes])


  useEffect(() => {

    const fetchUser = async () => {
      const res = await axios.get(`/user?userId=${post.userId}}`);
      setUser(res.data);
    }
    fetchUser();
  }, [post.userId]);

  return (
      <div className='post'>
          <div className="postWrapper">
        <div className="postTop">
          <div className="TopLeft">

            <Link to={`profile/${currentUser.username}`} >
               <img className='postProPic' src={user.profilePic ? PF + user.profilePic : PF + "/avatar.png"} alt="" />
            </Link>
            
            <span className="postUserName">{currentUser.username}  </span>
            <span className="postTime">{format(post.createdAt)}</span>
          </div>
          <div className="TopRight">
           <MoreVert/>
          </div>
        </div>
        <hr className='postTopHr' />

        <div className="postCenter">
          <span className="postText">{ post?.desc}</span>
          <img src={ PF + post.img} alt="" className="postImg" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img className='likeIcon' src="/assets/like.jpg" alt="" onClick={likeHandler} />
            <img className='likeIcon' src="/assets/love.png" alt="" onClick={likeHandler} />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.comment } Comments
            </span>
          </div>

        </div>

          </div>
    </div>
  )
}

export default Post
