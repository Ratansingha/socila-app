import React, { useContext, useRef, useState } from 'react';
import "./share.css"
import { EmojiEmotions, Label, PermMedia, Room }from "@mui/icons-material"
import { AuthContext } from '../../context/AuthContext';  
import axios from 'axios';
const Share = () => {
     const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc:desc.current.value,
        }
        if (file) {
            const data = new FormData(); 
            const fileName = Date.now() + file.name;
            data.append(file, "file");
            data.append(fileName, "name");
            newPost.img = fileName;
            try {
                await axios.post("/upload",data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await axios.post("/post", newPost);
            window.location.reload();
        } catch (error) {
          console.log(error)  
        }
}
  return (
    <div className='share'> 
          <div className="shareWrapper">
              <div className="shareTop">
                  <img src={user.profilePic ? PF + user.profilePic : PF + "avatar.png"} alt="" className="shareImg" />
                  
                  <input type="text" placeholder= {"Share what's yours mind " + user.username + "?"}
                 className="shareInput" ref={desc} />
              </div>
              <hr className="shareHr" />
              <form className="shareBottom" onSubmit={handleSubmit}>
                  <div className="shareOptions">
                      <label htmlFor="file" className="shareOption">
                          <PermMedia
                             htmlColor='tomato' className='shareIcon' />
                          <span className='shareOptionText'>Photo or Video</span>
                          <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0]) } />
                      </label>
                      <div className="shareOption">
                          <Label
                               htmlColor='green' className='shareIcon' />
                          <span className='shareOptionText'>Tag</span>
                      </div>
                      <div className="shareOption">
                          <Room
                           htmlColor='blue'     className='shareIcon' />
                          <span className='shareOptionText'> Locations</span>
                      </div>
                      <div className="shareOption">
                          <EmojiEmotions
                               htmlColor='gold' className='shareIcon' />
                          <span className='shareOptionText'>Feelings</span>
                      </div>
                  </div>
                  <button
                      type="submit" className="shareButton">Share</button>
              </form>
      </div>
    </div>
  )
}

export default Share
