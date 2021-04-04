import React, {useState} from "react";
import ContentBody from "./ContentBody";
function QueuePost({ item }) {

  const [viewerOpened, setViewerOpened] = useState(false);
  
  return (
    <div className="mb-4">
      <div className="h-full px-2 min-h-40 bg-custom-pink-300 rounded-md shadow-md flex child last:mb-0 transition relative">
        <ContentBody postContent={item.content} />
      </div>
    </div>
  );
}

export default QueuePost;
