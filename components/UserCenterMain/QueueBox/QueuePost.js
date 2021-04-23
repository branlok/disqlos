import React, {useState, useRef} from "react";
import ContentBody from "./ContentBody";
function QueuePost({ item,  }) {
  
  const [expand, setExpand] = useState(true);
  
  const values = expand ? "w-2/5 flex-none ml-2 my-2 rounded-md overflow-hidden object-cover transition-all z-20" : ""
  
  return (
    <div className="mb-4 2xl:w-1/2 2xl:px-2 2xl:h-80 transition-all">
      <div className="h-full max-h-96 px-2 bg-custom-pink-300 dark:bg-cb-4  rounded-md shadow-md flex child last:mb-0 relative">
      {expand && <ContentBody image={item.imageUrl} createdOn={item.createdOn} numberOfChildren={item.numberOfChildren} postContent={item.content} queueId={item.queueId} />}
        {/* {item.type == "image" && !expand && <img className="w-full flex-none my-2 rounded-md overflow-hidden object-cover z-30 transition-all" src={item.imageUrl}></img>} */}
        {/* {item.type == "image" && <button onClick={() => setExpand(!expand)} className="absolute bottom-4 right-4 z-40">hover</button> } */}
      </div>

    </div>
  );
}

export default QueuePost;
