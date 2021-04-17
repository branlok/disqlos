import { useRouter } from 'next/router';
import React from 'react'
import ProfileCircle from '../BasicComponents/ProfileCircle';

function MiniUserCard({
    name,
    caption,
    imageURL,
    link,
    active,
    followButton,
    targetId,
  }) {
    const router = useRouter()

    return (
        <div className={` h-14 w-14 mb-2`} onClick={() => router.push(`/explore/${targetId}`) }>
            <ProfileCircle imageURL={imageURL}/>
        </div>
    )
}

export default MiniUserCard
