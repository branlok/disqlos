import React from 'react'
import useUser from '../Queries/USERS/useUser'

function Header() {

    const {userData} = useUser();
    const userProfile = userData.data;

    //preemptive measures when firestore hasnt update yet.
    const numberOfPosts = userProfile.numberOfPosts ? userProfile.numberOfPosts : "0";
    const numberOfFollowers = userProfile.numberOfFollowers ? userProfile.numberOfFollowers : "0";
    const numberOfFollowing = userProfile.following?.length - 1 ? userProfile.following.length - 1  : "0"; 

    return (
        <div className="h-14 w-full flex justify-between items-center bg-custom-pink-400 px-4 rounded-md border-2 border-gray mb-5">
            <div>
               <b className="text-gray-600 flex-initial"> {userProfile.displayName}</b>
            </div>
            <ul className="w-9/12  lg:w-9/12 flex justify-end px-4 text-gray-600 text-xs lg:text-base ">
                <li className="px-2 text-center"> {numberOfPosts} Posts</li>
                <li className="px-2 text-center"> {numberOfFollowers} Followers  </li>
                <li className="px-2 text-center"> {numberOfFollowing} Following </li>
            </ul>
        </div>
    )
}

export default Header
