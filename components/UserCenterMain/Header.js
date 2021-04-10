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
        <div className="h-14 w-full flex flex-col md:flex-row justify-between items-center bg-custom-pink-400 px-4 rounded-md border-2 border-gray mb-5">
            <div className="h-full flex justify-between items-center ">
               <b className=" text-gray-600"> {userProfile.displayName}</b>
            </div>
            <ul className="h-full flex items-center justify-end text-gray-600 text-xs lg:text-base ">
                <li className="px-2 text-center"> {numberOfPosts} Posts</li>
                <li className="px-2 text-center"> {numberOfFollowers} Followers  </li>
                <li className="px-2 text-center"> {numberOfFollowing} Following </li>
            </ul>
        </div>
    )
}

export default Header
