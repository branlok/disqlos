import React, { useEffect, useState } from "react";
import PortfolioCard from "./PortfolioCard";
import ContentBody from "./ContentBody";
import Settings from "./Settings";
import Comments from "./Comments/index";
import PostStats from "./PostStats";
import useLikePost from "../utils/useLikePost";
import useUser from "../../Queries/USERS/useUser";
import { useQuery, useQueryClient } from "react-query";
import { getOwnUserData } from "../../Queries/USERS/useUser";
import useOnlyUserData from "../../Queries/USERS/useOnlyUserData";
import QueuePostsContent from "./QueuePostsContent/index";

// function matchDirectoryToCache(directory, targetId) {
// return directory == "posts" ? "fetchOwnPosts" : directory == "feed" ? "fetchFollowingPosts" : ["getTargetPosts", targetId]
// }

function BasicPost({
  clientLiked,
  item,
  page,
  queuedPost,
  directory,
  queueId,
  targetId,
}) {
  const { userData } = useOnlyUserData();
  //const cacheReference = matchDirectoryToCache(directory, targetId)
  const liked = item.likedBy.includes(userData.data.uid);

  const { likeMutation } = useLikePost(item.postId, [
    "getPosts",
    directory,
    targetId,
  ]);

  function handleLikeUnlike() {
    if (liked) {
      likeMutation.mutate({ unlike: true, page });
      // mutateLikePost(true, page, directory);
    } else {
      likeMutation.mutate({ unlike: false, page });
      // mutateLikePost(false, page, directory);
    }
  }

  //Queu Logic

  //render current or use pagination
  const [showChildrenPosts, setShowChildrenPosts] = useState(false);

  const pagination = item.leadPost ? true : false;

  return (
    <div className="relative h-full px-2 mb-4 bg-custom-pink-300 dark:bg-cb-4 rounded-md shadow-md flex flex-col child last:mb-0 transition ">
      <div className="relative flex child">
        <PortfolioCard postOwner={item.userId} post={item} />
        {showChildrenPosts ? (
          <QueuePostsContent queueContent={item.childrenPosts} setShowChildrenPosts={setShowChildrenPosts}/>
        ) : (
          <ContentBody postContent={item.content} date={item.createdOn} numberOfChildren={item.numberOfChildren} story={item.numberOfChildren && true}/>
        )}
        <Settings
          postId={item.postId}
          postOwner={item.userId}
          queuedPost={queuedPost}
          queueId={queueId}
          directory={directory}
          targetId={targetId}
          contentValue={item.content}
          type="text"
          myUserProfilePicture={userData.data.primaryProfileImage}
        />
        {pagination && !showChildrenPosts && (
          <div className="absolute top-3.5 right-2 ">
            <button className="font-bold rounded-md bg-gray-500 text-white py-1 p-2 hover:bg-gray-800 hover:text-white text-xs transition " onClick={() => setShowChildrenPosts(true)}>Open</button>
          </div>
        )}
      </div>

      {!queuedPost && (
        <Comments
          postId={item.postId}
          page={page}
          numberOfComments={item.numberOfComments}
          directory={directory}
          handleLikeUnlike={handleLikeUnlike}
          liked={liked}
          targetId={targetId}
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
