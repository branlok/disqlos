import React, {useEffect, useState} from "react";
import PortfolioCard from "./PortfolioCard";
import ContentBody from "./ContentBody";
import Settings from "./Settings";
import Comments from "./Comments/index";
import PostStats from "./PostStats";
import useLikePost from "../utils/useLikePost";
import useUser from "../../Queries/USERS/useUser";
function BasicPost({ clientLiked, item, page, queuedPost, directory}) {

  const [viewerOpened, setViewerOpened] = useState(false);
  const {userData} = useUser();
  //did user like the post

  const liked = item.likedBy.includes(userData.data.uid);
  console.log(item.likedBy,)
  const { mutateLikePost } = useLikePost(item.postId);
  
  function handleLikeUnlike() {
    if (liked) {
      //({unlike, page, directory})
      mutateLikePost(true, page, directory);
    } else {
      mutateLikePost(false, page, directory);
    }
  }

  return (
    <div className="relative mb-4">
      <div className="h-full px-2 mb-2 min-h-40 max-h-80 bg-custom-pink-300 rounded-md shadow-md flex child last:mb-0 transition relative">
        <PortfolioCard postOwner={item.userId} post={item} />
        <ContentBody postContent={item.content} />
        <Settings postId={item.postId} postOwner={item.userId} liked={liked} handleLikeUnlike={handleLikeUnlike} queuedPost={queuedPost} />
      </div>
      {!queuedPost && <Comments  postId={item.postId} viewerOpened={viewerOpened} setViewerOpened={setViewerOpened} page={page} numberOfComments={item.numberOfComments} directory={directory}/>}
     {!queuedPost && <PostStats postId={item.postId} likedBy={item.likedBy} numberOfCommments={item.numberOfComments} liked={liked}  handleLikeUnlike={handleLikeUnlike}/>}
    </div>
  );
}

export default BasicPost;
