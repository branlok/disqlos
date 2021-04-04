import React from 'react'

function ContentBody({postContent}) {
    return (
        <div className="text-s font-gray-700 w-full bg-custom-pink-550 flex flex-col justify-center items-center text-center ml-2 rounded-md p-6 overflow-hidden my-2">
           <div className="text-xs text-gray-400 ">Januaray 21st 2012</div>
           {postContent}
        </div>
    )
}

export default ContentBody
