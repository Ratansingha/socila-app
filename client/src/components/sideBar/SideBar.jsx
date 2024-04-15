import React from 'react'
import "./sideBar.css"
import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircle, RssFeed, School, WorkOutline } from "@mui/icons-material"
import {Users} from "../../dummyData"
import Friend from '../closeFriend/Friend'

const SideBar = () => {
  return (
    <div className='sideBar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">

          <li className="sidebarListItem">
            <RssFeed className='sidebarIcon'/>
            <span className="listItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className='sidebarIcon'/>
            <span className="listItemText">Chats</span>
          </li>

          <li className="sidebarListItem">
            <PlayCircle className='sidebarIcon'/>
            <span className="listItemText">Videos</span>
          </li>

          <li className="sidebarListItem">
            <Group className='sidebarIcon'/>
            <span className="listItemText">Groups</span>
          </li>

          <li className="sidebarListItem">
            <Bookmark className='sidebarIcon'/>
            <span className="listItemText">Bookmarks</span>
          </li>

          <li className="sidebarListItem">
            <HelpOutline className='sidebarIcon'/>
            <span className="listItemText">Questions</span>
          </li>

          <li className="sidebarListItem">
            <WorkOutline className='sidebarIcon'/>
            <span className="listItemText">Jobs</span>
          </li>

          <li className="sidebarListItem">
            <Event className='sidebarIcon'/>
            <span className="listItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className='sidebarIcon'/>
            <span className="listItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More...</button>
        <hr className='sidebarHr' />
        <ul className="sidebarFriendList">
          {Users.map(u => (
            <Friend key={u.id} user={u} />
     ))}
        </ul>
     </div>
    </div>
  )
}

export default SideBar
