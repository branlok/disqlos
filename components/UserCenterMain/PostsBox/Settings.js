import React, { useEffect, useState } from "react";
import { useAuth } from "../../../utils/auth";
import useDeletePost from "../utils/useDeletePost";
import SDFWE from "../../../styles/svg/threedots.svg";
import HeartItSvg from "../../../styles/svg/heart.svg";

function Settings({
  postId,
  postOwner,
  liked,
  handleLikeUnlike,
  queuedPost,
  queueId,
}) {
  let { userId } = useAuth();

  const ownership = userId == postOwner ? true : false;

  let [toggle, setToggle] = useState(false);
  let {
    deletePost,
    deletePostMutation,
    deletePostMutationWithQueue,
  } = useDeletePost();

  return (
    <div>
      <div
        className="absolute top-4 right-4 cursor-pointer rounded-md bg-gray-200 h-6 flex justify-center items-center hover:bg-gray-300 transition-all "
        onClick={() => setToggle(!toggle)}
      >
        <SDFWE className="fill-current text-gray-400 p-1" />
      </div>
      {toggle && (
        <div className="absolute flex justify-center top-4 right-12  h-6">
          {ownership && (
            <button
              onClick={() => {
                queuedPost
                  ? deletePostMutationWithQueue.mutate({
                      userId,
                      postId,
                      refetchTarget: "fetchMetaPosts",
                      queueId,
                    })
                  : deletePost(postId, "fetchOwnPosts");
              }}
              className="bg-red-500 text-white text-sm rounded-md h-full flex justify-center items-center px-2 mx-1"
            >
              Delete
            </button>
          )}
          {!ownership && (
            <button
              onClick={() => deletePost(postId, "fetchOwnPosts")}
              className="bg-red-500 text-white text-sm rounded-md h-full flex justify-center items-center px-2 mx-1"
            >
              Report
            </button>
          )}
        </div>
      )}
      {/* {!queuedPost && (
        <div
          className="absolute bottom-4 right-4 cursor-pointer border rounded-md bg-gray-200  flex justify-center items-center hover:bg-gray-300 transition-all"
          onClick={() => handleLikeUnlike()}
        >
          <HeartItSvg
            className={`fill-current  ${
              liked ? "text-red-400" : "text-gray-400"
            } p-1 h-6 w-6`}
          />
        </div>
      )} */}
    </div>
  );
}

export default Settings;
