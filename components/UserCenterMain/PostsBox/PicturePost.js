import React, {useState} from 'react'
import ImageCard from './ImageCard';
import ContentBody from './ContentBody';
function PicturePost() {
    return (
        <div className="h-full px-2 mb-2 bg-custom-pink-300 rounded-md shadow-md flex child last:mb-0 transition ">
            <ImageCard/>
            <ContentBody/>
        </div>
    )
}

export default PicturePost
