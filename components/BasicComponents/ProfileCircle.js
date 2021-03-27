import React from 'react'

function ProfileCircle({imageURL = "https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2Ftumblr_dcd52407b045254bd57867b80ff5d9b8_8d32fced_540.png?alt=media&token=0623aebd-d476-4cff-a38c-007939def1d9", link}) {

    
    return (
            <img src={imageURL} className="h-full w-full rounded-full box-border border-2 border-custom-pink-600 overflow-hidden object-cover p-0.5 bg-white cursor-pointer"></img>
    )
}

export default ProfileCircle
