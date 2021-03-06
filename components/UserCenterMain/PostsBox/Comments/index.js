import React, {useState} from "react";
import InputComment from "./InputComment";
import CommentsViewer from "./CommentsViewer";
import useCommentsReq from "./useCommentsReq";
function Comments({targetId, postId, page, numberOfComments, directory, liked, handleLikeUnlike}) {
  const [viewerOpened, setViewerOpened] = useState(false);
  const { commentsResponse } = useCommentsReq(postId, viewerOpened);
  return (
    <div className="h-full px-2 py-2 mb-2 bg-custom-pink-300  dark:bg-cb-3 dark:text-gray-200 dark:border-cb-4  rounded-md shadow-md flex flex-col child transition border ">
     {viewerOpened && <CommentsViewer targetId={targetId} commentsResponse={commentsResponse} postId={postId} viewerOpened={viewerOpened} postCachedLocation={page} numberOfComments={numberOfComments} directory={directory}/>}
      <InputComment targetId={targetId} handleLikeUnlike={handleLikeUnlike} liked={liked} postId={postId} setViewerOpened={setViewerOpened} viewerOpened={viewerOpened} page={page} directory={directory}/>
    </div>
  );
}

/* Component fetches on first exapnding comments the first time.
    subsequent fetches occurs when user submits a comment.
*/

export default Comments;
