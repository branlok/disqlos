import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import HeartSvg from "../../../styles/svg/heart.svg";
import CommentSvg from "../../../styles/svg/messagebubble.svg";
import useCommentsReq from "./Comments/useCommentsReq";
import usePostGetters from "./usePostGetters";

function PostStats({ likedBy, liked, handleLikeUnlike, numberOfCommments, postId }) {
  //outside parents needs to have a relative tag, for this to work.
  const numberOfLikes = likedBy.length; //this is dependent on some truth
    // let {commentsResponse} = useCommentsReq(postId, true); 
    // let commentsResponse = queryClient.getQueryData(["fetchComments", postId ]);
    // let currentNumberOfComments = commentsResponse && commentsResponse.pages.reduce((accumulator, currentValue) => accumulator + currentValue.length, 0)
    // console.log(commentsResponse, currentNumberOfComments, "sd")

  const STYLE_HEART = liked
    ? "fill-current cursor-pointer text-red-400 dark:text-special-teal"
    : "fill-current cursor-pointer text-gray-400 dark:hover:text-special-teal transition-colors";

  return (
    <div>
      <div
        className="absolute top-0 -left-10 shadow-sm p-1.5 w-8 rounded border text-gray-400 bg-gray-100 dark:bg-cb-3 dark:border-cb-3 text-xs flex-col justify-center items-center hover:text-red-500"
        onClick={() => handleLikeUnlike()}
      >
        <HeartSvg className={STYLE_HEART} />
        <div className={"text-center mt-1 text-gray-400"}>{numberOfLikes}</div>
      </div>
      <div className="absolute top-14 -left-10 shadow-sm p-1.5 w-8 rounded border text-gray-400 bg-gray-100 dark:bg-cb-3 dark:border-cb-3 text-xs">
        <CommentSvg className="fill-current cursor-pointer" />
        <div className="text-center mt-1 text-gray-400">
          {numberOfCommments} 
        </div>
      </div>
    </div>
  );
}

export default PostStats;
