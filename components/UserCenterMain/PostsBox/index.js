import React from 'react'
import BasicPost from './BasicPost'
import PicturePost from './PicturePost';
import Comments from './Comments/index';
import {useAuth} from '../../../utils/auth'
function PostsBox() {
    let {userId} = useAuth();
    console.log(userId);
    //react query map over neccessary components
    return (
        <div className="w-full mt-2">
           <BasicPost/>
           <Comments/>
           <PicturePost/>
           <Comments/>
           <BasicPost/>
           <BasicPost/>
           <PicturePost/>
           <BasicPost/>
           <BasicPost/>
        </div>
    )
}

export default PostsBox

