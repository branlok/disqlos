import React, {useState} from 'react'
import Header from './Header';
import PostMaker from './PostMaker';
import ProfileNav from './ProfileNav';
import PostsBox from './PostsBox/index';
function UserCenterMain() {
    const [user, setUser]  = useState("owner"); //username in database
    const [directive, setDirective] = useState("feed") //submap of user's content 1. View Posts [filters], StoryMode
    
    return (
        <div className="h-full w-full flex-initial bg-custom-gray-500 shadow-lg z-0 px-2 md:px-20 pt-4 overflow-scroll no-scrollbar">
            <Header/>
            <PostMaker/>
            <ProfileNav/>
            <PostsBox/>
        </div>
    )
}

export default UserCenterMain
