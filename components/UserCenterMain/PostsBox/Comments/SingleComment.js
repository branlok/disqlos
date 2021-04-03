import React from 'react'

function SingleComment({item}) {
    return (
        <div className="my-2 bg-custom-pink-300 rounded-sm flex flex-col p-2 first:mt-0 last:mb-0">
            <header>
                <div className="text-xs font-bold text-gray-500">
                   brandon
                </div>
            </header>
            <div className="text-sm ">
            {item.content}
            </div>

        </div>
    )
}

export default SingleComment
