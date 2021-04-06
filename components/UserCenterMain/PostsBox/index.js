import React, {useEffect} from 'react'
import BasicPost from './BasicPost'
import PicturePost from './PicturePost'
import {useAuth} from '../../../utils/auth'
import usePostGetters from "./usePostGetters"

function PostsBox() {
    let {userId} = useAuth();
    let {ownPostsResponse} = usePostGetters();


    if (ownPostsResponse.isSuccess) console.log(ownPostsResponse.data);
    //react query map over neccessary components
    if (ownPostsResponse.isSuccess) {
        return (
        <div className="w-full mt-2">
            {ownPostsResponse.data.map((item) => {
                if (item.type == "text") return <BasicPost key={item.postId} item={item} />
                if (item.type == "image") return <PicturePost key={item.postId} item={item}/> 
            })}
        </div>
    )} else if (ownPostsResponse.isLoading) {
        return <div>loading</div>
    } else {
        return <div> error </div>
    }
}

export default PostsBox




