import React, { useState, useEffect } from "react";
import HeartSvg from "../../../styles/svg/heart.svg";
import CommentSvg from "../../../styles/svg/messagebubble.svg";
import usePostGetters from "./usePostGetters";

function PostStats({ likedBy, liked, handleLikeUnlike, numberOfCommments }) {
  //outside parents needs to have a relative tag, for this to work.
  const numberOfLikes = likedBy.length; //this is dependent on some truth

  const STYLE_HEART = liked
    ? "fill-current cursor-pointer text-red-400"
    : "fill-current cursor-pointer text-gray-400";

  return (
    <div>
      <div
        className="absolute top-0 -left-10 shadow-sm p-1 w-8 rounded border text-gray-400 bg-gray-100 text-xs flex-col justify-center items-center hover:text-red-500"
        onClick={() => handleLikeUnlike()}
      >
        <HeartSvg className={STYLE_HEART} />
        <div className={"text-center mt-1 text-gray-400"}>{numberOfLikes}</div>
      </div>
      <div className="absolute top-14 -left-10 shadow-sm p-1 w-8 rounded border text-gray-400 bg-gray-100 text-xs hover:text-black">
        <CommentSvg className="fill-current cursor-pointer" />
        <div className="text-center mt-1 text-gray-400">
          {numberOfCommments}
        </div>
      </div>
    </div>
  );
}

export default PostStats;
