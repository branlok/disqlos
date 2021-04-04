import React from 'react'

function ContentBody({postContent}) {
    return (
        <div className="text-s font-gray-700 w-full bg-custom-pink-550 flex flex-col justify-center items-center text-center  rounded-md p-6  my-2 overflow-hidden">
          <div className="text-gray-500 text-xs my-2 border-gray-300  w-3/4">January 31, 2019</div>
          <div>{postContent} </div>
          <button className="rounded-md text-white py-2 px-8 my-2 font-bold bg-custom-pink-1000">
              Build Story
          </button>
          <div className="text-gray-700 border rounded-md p-1 px-4 border-gray-600 text-sm">
              2 post
          </div>
        </div>
    )
}

export default ContentBody
