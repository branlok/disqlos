import React from 'react'

function Comments() {
    return (
        <div className="h-full px-2 py-2 mb-2 bg-custom-pink-300 rounded-md shadow-md flex child last:mb-0 transition  mb-4 ">
            <form className=" h-full w-full items-center flex justify-center"><input className="w-9/12 mr-2 rounded-md pl-2" type="text"></input><input className="w-1/4 bg-gray-800 text-white rounded-md" type="submit" value="Comment"></input></form>
        </div>
    )
}

export default Comments
