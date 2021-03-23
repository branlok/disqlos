import React from 'react'
import BasicProfile from './BasicProfile';
import Button from './Button';
function UserControlSidebar() {
    return (
        <div  className="h-full w-48 flex-none xl:w-80 bg-custom-pink-500 p-2">
            <BasicProfile/>
            <Button name="Home" />
            <Button  name="Explore"/>
            <Button  name="Queue"/>
            <Button  name="Settings"/>
        </div>
    )
}

export default UserControlSidebar
