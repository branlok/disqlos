import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import HeartSvg from "../../../styles/svg/heart.svg";
import CommentSvg from "../../../styles/svg/messagebubble.svg";
import useCommentsReq from "./Comments/useCommentsReq";
import usePostGetters from "./usePostGetters";
import useWindowDimensions from "../../../utils/useWindowDimensions";

function PostStats({
  likedBy,
  liked,
  handleLikeUnlike,
  numberOfCommments,
  postId,
}) {
  const numberOfLikes = likedBy.length; //this is dependent on some truth
  let { width } = useWindowDimensions();
  const [mobile, setMobile] = useState();

  useEffect(() => {
    if (width < 640) {
      setMobile(true);
    } else if (width >= 640) {
      setMobile(false);
    }
  });

  const STYLE_HEART = liked
    ? "fill-current cursor-pointer text-red-400 dark:text-special-teal"
    : "w-full fill-current cursor-pointer  dark:hover:text-special-teal transition-colors";

  if (mobile) return null;
  return (
    <div className="absolute top-0 -left-10  w-8 ">
      <div
        className="shadow-md mb-2 p-1.5 w-full rounded border text-gray-400  bg-gray-100  dark:bg-cb-3  dark:border-cb-3 text-xs flex-col justify-center items-center "
        onClick={() => handleLikeUnlike()}
      >
        <HeartSvg className={STYLE_HEART} />
        <div className={"text-center mt-1 text-gray-400"}>{numberOfLikes}</div>
      </div>
      <div className=" shadow-md p-1.5 w-full rounded border text-gray-400  bg-gray-100  dark:bg-cb-3 dark:border-cb-3 text-xs">
        <CommentSvg className="fill-current cursor-pointer" />
        <div className="text-center mt-1 text-gray-400">
          {numberOfCommments}
        </div>
      </div>
    </div>
  );
}

export default PostStats;
