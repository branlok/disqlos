import React, { useEffect } from "react";
import useCommentsReq from "./useCommentsReq";
import SingleComment from "./SingleComment";
import MessageBubble from "../../../../styles/svg/messsagebubble.svg";
function CommentsViewer({ postId, viewerOpened }) {
  //any changes do this doesn't actually cause rerender? does it?
  const { commentsResponse } = useCommentsReq(postId, viewerOpened);

  if (commentsResponse.status == "success") {
    return (
      <div className="h-full w-full py-2 bg-custom-pink-550 mb-2 rounded-md ">
        <div className="max-h-56 px-2 rounded-md overflow-y-scroll no-scrollbar">
          {!commentsResponse.data.length && (
            <div className="flex justify-center flex-col items-center font-xs py-2">
              {" "}
              <MessageBubble className="mb-2" /> No one has replied yet, be the
              first!
            </div>
          )}
          {commentsResponse.data?.map((item) => {
            return (
              <SingleComment key={item.commentId} item={item}></SingleComment>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full py-2 bg-custom-pink-550 mb-2 rounded-md ">
        <div className="max-h-56 px-2 rounded-md overflow-y-scroll no-scrollbar">
          <div className="flex justify-center flex-col items-center font-xs py-2">
          Loading...
          </div>
        </div>
      </div>
    );
  }
}

export default CommentsViewer;
