import React from 'react'

function ProfileCircle({imageURL = "https://images.businessoffashion.com/profiles/asset/1803/66020face65d71ce2645adbb38f614dca1e9f744.jpeg?auto=format%2Ccompress&crop=top&fit=crop&h=576&w=1024", link}) {

    
    return (
            <img src={imageURL} className="h-full w-full rounded-full box-border border-2 border-custom-pink-600 overflow-hidden object-cover p-0.5 bg-white cursor-pointer"></img>
    )
}

export default ProfileCircle
