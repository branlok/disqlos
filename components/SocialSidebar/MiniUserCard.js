import React from 'react'
import ProfileCircle from '../BasicComponents/ProfileCircle';

function MiniUserCard({name, caption, imageURL, link, active}) {

    

    return (
        <div className={`mb-2`}>
            <ProfileCircle imageURL={imageURL}/>
        </div>
    )
}

export default MiniUserCard
