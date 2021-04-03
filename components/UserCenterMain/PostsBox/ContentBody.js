import React from 'react'

function ContentBody({postContent}) {
    return (
        <div className="text-s font-gray-700 w-full bg-custom-pink-550 flex justify-center items-center text-center ml-2 rounded-md p-6 overflow-hidden my-2">
           {postContent}
        </div>
    )
}

export default ContentBody
