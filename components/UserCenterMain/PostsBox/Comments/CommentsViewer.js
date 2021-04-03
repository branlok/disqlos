import React, { useEffect } from "react";
import useCommentsReq from "./useCommentsReq";
import SingleComment from "./SingleComment";
function CommentsViewer({ postId, viewerOpened }) {
  //any changes do this doesn't actually cause rerender? does it?
  console.log(viewerOpened, "yo");
  const { commentsResponse } = useCommentsReq(postId, viewerOpened);

  if (commentsResponse.status == "success") {
    return (
      <div className="h-full w-full py-2 bg-custom-pink-550 mb-2 rounded-md ">
         <div className="max-h-56 px-2 rounded-md overflow-y-scroll no-scrollbar">
             {!commentsResponse.data.length && <div className="flex justify-center items-center font-xs"> Empty </div>}
          {commentsResponse.data?.map((item) => {
            return <SingleComment key={item.commentId} item={item}></SingleComment>;
          })}

         </div>
      </div>
    );
  } else {
    return <div>Placeholder Loading</div>;
  }
}

export default CommentsViewer;
