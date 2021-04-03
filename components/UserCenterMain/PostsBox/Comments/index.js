import React, {useState} from "react";
import InputComment from "./InputComment";
import CommentsViewer from "./CommentsViewer";
function Comments({postId, viewerOpened, setViewerOpened}) {

  return (

    <div className="h-full px-2 py-2 mb-2 bg-custom-pink-300 rounded-md shadow-md flex flex-col child transition">
     {viewerOpened && <CommentsViewer postId={postId} viewerOpened={viewerOpened}/>}
      <InputComment postId={postId} setViewerOpened={setViewerOpened} viewerOpened={viewerOpened}/>
    </div>
  );
}

/* Component fetches on first exapnding comments the first time.
    subsequent fetches occurs when user submits a comment.
*/

export default Comments;
