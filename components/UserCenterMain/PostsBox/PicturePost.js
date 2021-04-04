import React, {useState} from "react";
import ImageCard from "./ImageCard";
import ContentBody from "./ContentBody";
import PortfolioCard from "./PortfolioCard";
import Comments from "./Comments";
function PicturePost({ item }) {
    const [viewerOpened, setViewerOpened] = useState(false);
  console.log(item);
  return (
    <div className="h-full px-2 mb-2 bg-custom-pink-300 rounded-md shadow-md flex flex-col child last:mb-0 transition ">
      <ImageCard imageUrl={item.imageUrl}/>
      <div className="h-full flex child">
        <PortfolioCard />
        <ContentBody postContent={item.content} />
      </div>
      <Comments postId={item.postId} viewerOpened={viewerOpened} setViewerOpened={setViewerOpened}/>
    </div>
  );
}

export default PicturePost;
