import React, { useEffect, useState } from "react";
import { useAuth } from "../../../utils/auth";
import useDeletePost from "../utils/useDeletePost";
import SDFWE from "../../../styles/svg/threedots.svg";
import HeartItSvg from "../../../styles/svg/heart.svg";
import useCreateSpace from "../utils/useCreateSpace";

function Settings({
  postId,
  postOwner,
  queuedPost,
  queueId,
  directory,
  targetId,
  type,
  contentValue,
  myUserProfilePicture,
  imageUrl,
}) {
  let { userId } = useAuth();
  const ownership = userId == postOwner ? true : false;
  let [toggle, setToggle] = useState(false);

  let { deletePost, deletePostMutationWithQueue } = useDeletePost();

  const { addSpaceMutation } = useCreateSpace({
    userId,
    postOwner,
    postId,
    contentValue,
    type,
    imageUrl,
    myUserProfilePicture,
  });

  return (
    <div>
      <div
        className="absolute bottom-4 right-2 cursor-pointer rounded-md bg-gray-200  dark:bg-cb-2 w-6 h-6 flex justify-center items-center hover:bg-gray-300 transition-all "
        onClick={() => setToggle(!toggle)}
      >
        <SDFWE className=" h-full fill-current text-gray-400 p-1" />
      </div>
      {toggle && (
        <div className="absolute flex justify-center bottom-4 right-8  h-6">
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
                  : deletePost(postId, ["getPosts", directory, targetId]);
              }}
              className="bg-pale-red-1 hover:bg-red-400 text-white text-xs rounded-md h-full flex justify-center items-center px-2 mx-1 transition-colors "
            >
              Delete
            </button>
          )}
          {!ownership && (
            <button className="bg-pale-red-1 text-white text-sm rounded-md h-full flex justify-center items-center px-2 mx-1">
              Report
            </button>
          )}
          <button
            onClick={() =>
              !addSpaceMutation.isSuccess && addSpaceMutation.mutate()
            }
            className="bg-gray-700 text-white text-xs rounded-md h-full flex justify-center items-center px-2 ml-1 mr-2 hover:bg-gray-600  transition-colors"
          >
            {addSpaceMutation.isSuccess ? "added!" : "Use as Space"}
          </button>
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
