import React, { useEffect, useState } from "react";
import PortfolioCard from "./PortfolioCard";
import ContentBody from "./ContentBody";
import Settings from "./Settings";
import Comments from "./Comments/index";
import PostStats from "./PostStats";
import useLikePost from "../utils/useLikePost";
import useUser from "../../Queries/USERS/useUser";
import { useQuery, useQueryClient } from "react-query";
import {getOwnUserData} from "../../Queries/USERS/useUser";
import useOnlyUserData from "../../Queries/USERS/useOnlyUserData";

// function matchDirectoryToCache(directory, targetId) {
// return directory == "posts" ? "fetchOwnPosts" : directory == "feed" ? "fetchFollowingPosts" : ["getTargetPosts", targetId]
// }


function BasicPost({ clientLiked, item, page, queuedPost, directory, queueId, targetId }) {
  
  const { userData } = useOnlyUserData();

  //const cacheReference = matchDirectoryToCache(directory, targetId) 
 const liked = item.likedBy.includes(userData.data.uid);

 
  const { likeMutation } = useLikePost(item.postId, directory);
  
  function handleLikeUnlike() {
    if (liked) {
      likeMutation.mutate({unlike: true, page})
      // mutateLikePost(true, page, directory);
    } else {
      likeMutation.mutate({unlike: false, page})
      // mutateLikePost(false, page, directory);
    }
  }

  return (
    <div className="relative h-full px-2 mb-4 bg-custom-pink-300 rounded-md shadow-md flex flex-col child last:mb-0 transition ">
      <div className="h-full flex child">
        <PortfolioCard postOwner={item.userId} post={item} />
        <ContentBody postContent={item.content} />
        <Settings
          postId={item.postId}
          postOwner={item.userId}
          liked={liked}
          handleLikeUnlike={handleLikeUnlike}
          queuedPost={queuedPost}
          queueId={queueId}
        />
      </div>
      {!queuedPost && (
        <Comments
          postId={item.postId}
          page={page}
          numberOfComments={item.numberOfComments}
          directory={directory}
          handleLikeUnlike={handleLikeUnlike}
          liked={liked}
        />
      )}
      {!queuedPost && (
        <PostStats
          postId={item.postId}
          likedBy={item.likedBy}
          numberOfCommments={item.numberOfComments}
          liked={liked}
          handleLikeUnlike={handleLikeUnlike}
        />
      )}
    </div>
  );
}

export default BasicPost;
