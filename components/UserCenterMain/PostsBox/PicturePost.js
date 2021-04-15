import React, { useState } from "react";
import ImageCard from "./ImageCard";
import ContentBody from "./ContentBody";
import PortfolioCard from "./PortfolioCard";
import Comments from "./Comments";
import PostStats from "./PostStats";
import useLikePost from "../utils/useLikePost";
import useOnlyUserData from "../../Queries/USERS/useOnlyUserData";
import Settings from "./Settings";
function PicturePost({ item, page, queuedPost, directory, queueId }) {
  const [viewerOpened, setViewerOpened] = useState(false);
  const { userData } = useOnlyUserData();

  const liked = item.likedBy.includes(userData.data.uid);
  const { likeMutation } = useLikePost(item.postId, directory);

  function handleLikeUnlike() {
    if (liked) {
      likeMutation.mutate({ unlike: true, page });
      // mutateLikePost(true, page);
    } else {
      likeMutation.mutate({ unlike: false, page });
      // mutateLikePost(false, page);
    }
  }

  return (
    <div className="relative h-full px-2 mb-4 bg-custom-pink-300 rounded-md shadow-md flex flex-col child last:mb-0 transition ">
      <ImageCard imageUrl={item.imageUrl} />
      <div className="h-full flex child">
        <PortfolioCard postOwner={item.userId} post={item} />
        <ContentBody postContent={item.content} date={item.createdOn} />
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
          viewerOpened={viewerOpened}
          setViewerOpened={setViewerOpened}
          page={page}
          numberOfCommments={item.numberOfCommments}
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

export default PicturePost;
