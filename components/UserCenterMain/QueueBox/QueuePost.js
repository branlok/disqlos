import React, {useState} from "react";
import ContentBody from "./ContentBody";
function QueuePost({ item, setQueueId }) {

  const [viewerOpened, setViewerOpened] = useState(false);
  
  return (
    <div className="mb-4">
      <div className=" px-2 bg-custom-pink-300 rounded-md shadow-md flex child last:mb-0 transition relative">
        <ContentBody postContent={item.content} queueId={item.queueId} setQueueId={setQueueId}/>
        {item.type == "image" && <img className="ml-2 my-2 rounded-md border overflow-hidden object-cover" src={item.imageUrl}></img>}
      </div>
    </div>
  );
}

export default QueuePost;
