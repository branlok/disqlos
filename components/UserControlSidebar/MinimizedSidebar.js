import React from 'react'
import ProfileCircle from '../BasicComponents/ProfileCircle';
function MinimizedSidebar() {
    return (
        <div className="relative h-full w-20 flex-none bg-custom-pink-500 p-2 justify-between flex-col ">
            <div>
            <ProfileCircle/>
            </div>

        </div>
    )
}

export default MinimizedSidebar
