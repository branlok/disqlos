import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {useAuth} from "../../../utils/auth";
import {db} from "../../../utils/firebase"

export default function usePostGetters() {
    let {userId} = useAuth();
    
    const ownPostsResponse = useQuery("fetchOwnPosts", () => db.collection("PUBLIC_POSTS").where('userId', "==", userId).orderBy("createdOn", "desc").limit(10).get().then(querySnapshot => {
        let docArray = [];
        console.log("fetchOwnPosts")
        querySnapshot.forEach((item) => {docArray.push(item.data())});
        return docArray;
    }), {refetchOnMount: false, staleTime:1800000, cacheTime: 1800000});


    let followersArray = ["ylkv3cgZTwfbC7oPa4Q1f36HxNr1", "zo5cGdkQsQW0c50p7bfc3wn80Ci2"]

    const followPostsResponse = useQuery("fetchFollowingPosts", () => db.collection("PUBLIC_POSTS").where('userId', "in", followersArray).orderBy("createdOn", "desc").limit(10).get().then(querySnapshot => {
        let docArray = [];
        console.log("followerPosted")
        querySnapshot.forEach((item) => {docArray.push(item.data())});
        return docArray;
    }), {refetchOnMount: false, staleTime:1800000, cacheTime: 1800000}); //1800000 = 30 minutes , refetchOnMount false == the query will not refetch on mount, we manually use refetch() outside of hook.

    return {
        ownPostsResponse,
        followPostsResponse,
    };

} 