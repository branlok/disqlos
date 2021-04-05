import React, {useState} from "react";
import PortfolioCard from "./PortfolioCard";
import ContentBody from "./ContentBody";
import Settings from "./Settings";
import Comments from "./Comments/index";
function BasicPost({ item, useComments = true}) {

  const [viewerOpened, setViewerOpened] = useState(false);
  
  return (
    <div className=" mb-4">
      <div className="h-full px-2 mb-2 min-h-40 max-h-80 bg-custom-pink-300 rounded-md shadow-md flex child last:mb-0 transition relative">
        <PortfolioCard />
        <ContentBody postContent={item.content} />
        <Settings />
      </div>
      {useComments && <Comments postId={item.postId} viewerOpened={viewerOpened} setViewerOpened={setViewerOpened}/>}
    </div>
  );
}

export default BasicPost;
