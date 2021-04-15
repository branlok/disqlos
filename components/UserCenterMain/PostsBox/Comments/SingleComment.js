import React from "react";
import BinSVG from "../../../../styles/svg/deleteBin.svg";
import ProfileCircle from "../../../BasicComponents/ProfileCircle";
import useUser from "../../../Queries/USERS/useUser";
import useDeleteComment from "../../utils/useDeleteComment";

import TimeAgo from "react-timeago";

function SingleComment({targetId, postId, item, page, postCachedLocation, directory }) {
  const { userData } = useUser();
  const uid = userData.data.uid;

  //cacheLoaction is the pointer to the react-query cache system.
  const { deleteCommentMutation } = useDeleteComment(
    postId,
    item.commentId,
    page,
    postCachedLocation,
    directory,
    targetId
  );

  if (uid == item.uid) {
    let primaryProfileImage = userData.data.primaryProfileImage;
    return (
      <div className="my-1 bg-custom-pink-300 rounded-sm flex flex-row justify-between items-center px-2 py-1 first:mt-0 last:mb-0">
        <div className="relative flex flex-col w-full">
          <header className="flex justify-between items-center w-full border-b-2 pb-1 ">
            <div className="flex justify-between items-center py-2 h-full flex-col md:flex-row w-full">
              <div className="flex-col md:flex-row flex justify-between items-center">
                <img
                  className="w-7 h-7 object-cover rounded-full border"
                  src={primaryProfileImage}
                />
                <div className="text-sm font-bold text-gray-800 mx-2">
                  {item.uniqueDisplayName}
                </div>
              </div>
              <TimeAgo
                className="items-center text-xs text-gray-600"
                date={item.createdOn.toDate()}
                minPeriod="30"
              />
            </div>
            <div
              className="absolute md:relative md:ml-2 top-0.5 right-0 flex items-center justify-center w-8 h-8 flex-initial rounded-md bg-custom-pink-500 text-gray-300 hover:bg-red-500 hover:text-red-900 cursor-pointer"
              onClick={() => deleteCommentMutation.mutate()}
            >
              {item.uid == uid && <BinSVG className="w-4 h-4 fill-current " />}
            </div>
          </header>
          <div className="relative text-sm mt-2 pl-2 pb-4 ">{item.content}</div>
        </div>
      </div>
    );
  } else {
    let primaryProfileImage = item.primaryProfileImage;
    return (
      <div className="my-2 bg-custom-pink-300 rounded-sm flex flex-row justify-between items-center px-2 py-1 first:mt-0 last:mb-0">
        <div className="flex flex-col w-full">
          <header className="flex justify-between items-center w-full border-b-2 pb-1 ">
            <div className="flex justify-between items-center  h-full">
              <img
                className="w-7 h-7 object-cover rounded-full border"
                src={primaryProfileImage}
              ></img>
              <div className="ml-2 text-sm font-bold text-gray-800">
                {item.uniqueDisplayName}
              </div>
            </div>
          </header>
          <div className="text-sm mt-2 pl-2 pb-2 ">{item.content}</div>
        </div>
      </div>
    );
  }
}

export default SingleComment;
