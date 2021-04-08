import React, {useEffect, useState} from "react";
import PortfolioCard from "./PortfolioCard";
import ContentBody from "./ContentBody";
import Settings from "./Settings";
import Comments from "./Comments/index";
import PostStats from "./PostStats";
import useLikePost from "../utils/useLikePost";
function BasicPost({ clientLiked, item, useComments = true, page}) {

  const [viewerOpened, setViewerOpened] = useState(false);

  //did user like the post
  const liked = item.likedBy.includes(item.userId);
  const { mutateLikePost } = useLikePost(item.postId);

  function handleLikeUnlike() {
    if (liked) {
      mutateLikePost(true, page);
    } else {
      mutateLikePost(false, page);
    }
  }

  return (
    <div className="relative mb-4">
      <div className="h-full px-2 mb-2 min-h-40 max-h-80 bg-custom-pink-300 rounded-md shadow-md flex child last:mb-0 transition relative">
        <PortfolioCard />
        <ContentBody postContent={item.content} />
        <Settings postId={item.postId} postOwner={item.userId} liked={liked} handleLikeUnlike={handleLikeUnlike}/>
      </div>
      {useComments && <Comments  postId={item.postId} viewerOpened={viewerOpened} setViewerOpened={setViewerOpened} page={page} numberOfComments={item.numberOfComments}/>}
      <PostStats postId={item.postId} likedBy={item.likedBy} numberOfCommments={item.numberOfComments} liked={liked}  handleLikeUnlike={handleLikeUnlike}/>
    </div>
  );
}

export default BasicPost;
