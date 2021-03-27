import React from 'react'

function PostMaker() {
    return (
        <div className="w-100 h-34 bg-white rounded-md border-1 border-gray flex flex-col overflow-hidden mb-5">
            <textarea className="w-full h-full p-4" placeholder="Whats going on ?"/>
            <div className="w-full h-10 flex-none flex justify-between items-center px-4">
                <div>IMG SVG</div>
                <div className="flex items-center">
                    <div className="mx-2 rounded-sm px-10 bg-gray-200 rounded-sm">Settings</div>
                    <div className="mx-2 -mr-0 rounded-sm bg-custom-pink-1000  text-white px-10 rounded-sm">Queue</div>
                </div>
            </div>
        </div>
    )
}

export default PostMaker
