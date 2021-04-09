import React, {useState} from "react";
import InputComment from "./InputComment";
import CommentsViewer from "./CommentsViewer";
function Comments({postId, viewerOpened, setViewerOpened, page, numberOfComments, directory}) {

  return (

    <div className="h-full px-2 py-2 mb-2 bg-custom-pink-300 rounded-md shadow-md flex flex-col child transition border">
     {viewerOpened && <CommentsViewer postId={postId} viewerOpened={viewerOpened} postCachedLocation={page} numberOfComments={numberOfComments} directory={directory}/>}
      <InputComment postId={postId} setViewerOpened={setViewerOpened} viewerOpened={viewerOpened} page={page} directory={directory}/>
    </div>
  );
}

/* Component fetches on first exapnding comments the first time.
    subsequent fetches occurs when user submits a comment.
*/

export default Comments;
