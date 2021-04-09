import React, {useState} from "react";
import ImageCard from "./ImageCard";
import ContentBody from "./ContentBody";
import PortfolioCard from "./PortfolioCard";
import Comments from "./Comments";
import PostStats from "./PostStats";
import useLikePost from "../utils/useLikePost";
function PicturePost({ item, page , queuedPost}) {
    const [viewerOpened, setViewerOpened] = useState(false);
  
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
    <div className="relative h-full px-2 mb-2 bg-custom-pink-300 rounded-md shadow-md flex flex-col child last:mb-0 transition ">
      <ImageCard imageUrl={item.imageUrl}/>
      <div className="h-full flex child">
        <PortfolioCard  postOwner={item.userId} post={item}/>
        <ContentBody postContent={item.content} />
      </div>
     {!queuedPost && <Comments postId={item.postId} viewerOpened={viewerOpened} setViewerOpened={setViewerOpened} page={page} numberOfCommments={item.numberOfCommments}/>}
     {!queuedPost && <PostStats  postId={item.postId} likedBy={item.likedBy} numberOfCommments={item.numberOfComments} liked={liked}  handleLikeUnlike={handleLikeUnlike}/>}
    </div>
  );
}

export default PicturePost;
