import React from 'react'
import ProfileCircle from '../../BasicComponents/ProfileCircle'
function PortfolioCard({name, link}) {
    return (
        <div className=" w-28 flex-none bg-custom-pink-550 flex flex-col justify-center items-center rounded-md my-2 py-4">
            <div className="w-16 h-16"><ProfileCircle/></div>
            <div className="text-xs rounded p-1 px-2 m-1 text-custom-pink-900"> Follow </div>
            <p className="text-xs font-bold text-gray-600">Brandon</p>
        </div>
    )
}

export default PortfolioCard
