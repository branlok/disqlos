import React from 'react'

function UserCardPlaceholder() {
    return (
<div className="w-full h-16 bg-custom-pink-550 my-2 rounded-md flex flex-none items-center p-2">
          <div className="rounded-full bg-custom-pink-600 w-12 h-full flex-none" />
          <div className="w-full h-full ml-2 flex-initial  my-2 rounded-md flex flex-col">
            <div className="w-full h-8 bg-custom-pink-600 my-1 rounded-md  "></div>
            <div className="w-full h-4 bg-custom-pink-600 my-1 rounded-md  "></div>
          </div>
        </div>
    )
}

export default UserCardPlaceholder
