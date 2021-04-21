import React, {useState} from "react";
import ContentBody from "./ContentBody";
function QueuePost({ item,  }) {

  const [viewerOpened, setViewerOpened] = useState(false);
  
  return (
    <div className="mb-4 2xl:w-1/2 2xl:px-2 2xl:h-80">
      <div className="2xl:h-full max-h-80 px-2 bg-custom-pink-300 dark:bg-cb-4  rounded-md shadow-md flex child last:mb-0 transition relative">
        <ContentBody createdOn={item.createdOn} numberOfChildren={item.numberOfChildren} postContent={item.content} queueId={item.queueId} />
        {item.type == "image" && <img className="w-2/5 flex-none ml-2 my-2 rounded-md overflow-hidden object-cover" src={item.imageUrl}></img>}
      </div>

    </div>
  );
}

export default QueuePost;
