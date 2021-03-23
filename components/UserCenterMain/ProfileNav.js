import React from 'react'

function ProfileNav() {
    return (
        <div className="w-full h-12 border-b-2 flex flex-between items-center">
            <div className="h-full w-24 flex-none flex items-center mx-2 px-4 ">Feed</div>

            <ul className="h-full w-full flex justify-end items-center">
                <li className="px-4 mx-2 ">All Post</li>
                <li className="px-4 mx-2 ">Queues</li>
                <li className="px-4 mx-2 ">Stories</li>
            </ul>
        </div>
    )
}

export default ProfileNav
