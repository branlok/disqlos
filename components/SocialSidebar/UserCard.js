import React from 'react'
import ProfileCircle from '../BasicComponents/ProfileCircle';

function UserCard({name, caption, imageURL, link, active}) {
    let dynamicBorder = active ? "border-custom-pink-900" : "border-custom-pink-550" 
    let dynamicBg = active ? "bg-custom-pink-600" : "bg-gray-200"
    //const baseColor = "bg-custom-pink-550"
    // const baseColor = "bg-gray-200"
    //Notification Active
    //active -- border-custom-pink-900, bg-bg-custom-pink-550
    

    return (
        <div className={`w-full h-20 mb-2 p-0.5 rounded-md box-border border-2 ${dynamicBorder} bg-white hover:shadow-md transition-shadow duration-250 flex-none`}>
            <div className={`w-full h-full px-1 ${dynamicBg}  rounded-sm flex flex-row items-center cursor-pointer`}>
                <div className="h-16 w-16 flex-none"><ProfileCircle imageURL={imageURL}/></div>
                <div className="flex-initial px-2 flex flex-col justify-center">
                   <p className="font-bold">{name}</p> <br/>
                   <p className="text-xs text-gray p-0 m-0 ">Last posted {caption}</p>
                </div>
            </div>
        </div>
    )
}

export default UserCard
