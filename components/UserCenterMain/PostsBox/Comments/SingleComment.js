import React from "react";
import BinSVG from "../../../../styles/svg/deleteBin.svg";
import ProfileCircle from "../../../BasicComponents/ProfileCircle";
import useUser from "../../../Queries/USERS/useUser";
import displaySelection from "../../helperFunctions/displaySelection";
import useDeleteComment from "../../utils/useDeleteComment";
function SingleComment({ postId, item, page, postCachedLocation, directory }) {
  const { userData } = useUser();
  const uid = userData.data.uid;

  //cacheLoaction is the pointer to the react-query cache system.
  const { deleteComment } = useDeleteComment(
    postId,
    item.commentId,
    page,
    postCachedLocation,
    directory
  );

  if (uid == item.uid) {
    let primaryProfileImage =  userData.data.primaryProfileImage
    return (
      <div className="my-2 bg-custom-pink-300 rounded-sm flex flex-row justify-between items-center px-2 py-1 first:mt-0 last:mb-0">
        <div className="flex flex-col w-full">
          <header className="flex justify-between items-center w-full border-b-2 pb-1 ">
            <div className="flex justify-between items-center  h-full">
              <img className="w-7 h-7 object-cover rounded-full border" src={primaryProfileImage}>

              </img>
              <div className="ml-2 text-sm font-bold text-gray-800">
                {item.uniqueDisplayName}
              </div>
            </div>
            <div
              className="flex items-center justify-center w-8 h-8 flex-initial rounded-full bg-custom-pink-500"
              onClick={() => deleteComment()}
            >
              {item.uid == uid && (
                <BinSVG className="w-4 h-4 fill-current text-gray-600 hover:text-red-600 cursor-pointer" />
              )}
            </div>
          </header>
          <div className="text-sm mt-2 pl-2 pb-2 ">{item.content}</div>
        </div>
      </div>
    );
  } else {
    let primaryProfileImage = item.primaryProfileImage
    return (
        <div className="my-2 bg-custom-pink-300 rounded-sm flex flex-row justify-between items-center px-2 py-1 first:mt-0 last:mb-0">
          <div className="flex flex-col w-full">
            <header className="flex justify-between items-center w-full border-b-2 pb-1 ">
              <div className="flex justify-between items-center  h-full">
                <img className="w-7 h-7 object-cover rounded-full border" src={primaryProfileImage}>
  
                </img>
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
