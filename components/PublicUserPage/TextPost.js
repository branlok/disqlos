import React, { useState } from "react";
import { useQueryClient } from "react-query";
import InputComment from "../UserCenterMain/PostsBox/Comments/InputComment";
import Comments from "./Comments";
import ContentBody from "./ContentBody";
import useGetComments from "./utils/useGetComments";

function TextPost({ item }) {
  const [viewerOpened, setViewerOpened] = useState(false);
  const { commentsResponse } = useGetComments(item.postId, viewerOpened);
  

  return (
    <div className="relative mb-4">
      <div className="h-full px-2 mb-2 min-h-40 max-h-80 bg-custom-pink-300 rounded-md shadow-md flex child last:mb-0 transition relative">
        <ContentBody postContent={item.content} />
      </div>
      <div className="h-full px-2 py-2 mb-2 bg-custom-pink-300 rounded-md shadow-md flex flex-col child transition border">
      {viewerOpened && <Comments commentsResponse={commentsResponse} />}
      <InputComment loginProtected={true} viewerOpened={viewerOpened} setViewerOpened={setViewerOpened}/>
      </div>

    </div>
  );
}

export default TextPost;
