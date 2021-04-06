import React from 'react'
import useUser from '../Queries/USERS/useUser'

function Header() {

    const {userData} = useUser();
    const data = userData.data.data();
    

    return (
        <div className="h-14 w-full flex justify-between items-center bg-custom-pink-400 px-4 rounded-md border-2 border-gray mb-5">
            <div>
               <b className="text-gray-600 flex-initial"> {data.displayName}</b>
            </div>
            <ul className="w-9/12  lg:w-9/12 flex justify-end px-4 text-gray-600 text-xs lg:text-base ">
                <li className="px-2 text-center"> {data.numberOfPosts} Posts</li>
                <li className="px-2 text-center"> {data.numberOfFollowers} Followers  </li>
                <li className="px-2 text-center"> {data.following.length - 1} Following </li>
            </ul>
        </div>
    )
}

export default Header
