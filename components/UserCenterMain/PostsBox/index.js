import React, {useEffect} from 'react'
import BasicPost from './BasicPost'
import PicturePost from './PicturePost'
import {useAuth} from '../../../utils/auth'
import usePostGetters from "./usePostGetters"

function PostsBox() {
    let {userId} = useAuth();
    let {followPostsResponse} = usePostGetters();

    useEffect(() => {
        console.log(followPostsResponse)
       // if (!followPostsResponse.data) followPostsResponse.refetch();
    }, [])


    if (followPostsResponse.isSuccess) console.log(followPostsResponse.data);
    //react query map over neccessary components
    if (followPostsResponse.isSuccess) {
        return (
        <div className="w-full mt-2">
            {followPostsResponse.data.map((item) => {
                if (item.type == "text") return <BasicPost key={item.postId} item={item} />
                if (item.type == "image") return <PicturePost key={item.postId} item={item}/> 
            })}
        </div>
    )} else if (followPostsResponse.isLoading) {
        return <div>loading</div>
    } else {
        return <div> error </div>
    }
}

export default PostsBox




