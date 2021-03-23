import React from 'react'
import Header from './Header';
import PostMaker from './PostMaker';
import ProfileNav from './ProfileNav';
function UserCenterMain() {
    
    return (
        <div className="h-full w-full flex-initial bg-custom-gray-500 shadow-lg z-0 px-2 md:px-20 pt-4 overflow-scroll no-scrollbar">
            <Header/>
            <PostMaker/>
            <ProfileNav/>
        </div>
    )
}

export default UserCenterMain
