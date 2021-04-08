import React from "react";
import BinSVG from "../../../../styles/svg/deleteBin.svg";
import useUser from "../../../Queries/USERS/useUser";
import useDeleteComment from "../../utils/useDeleteComment";
function SingleComment({ postId, item, page, postCachedLocation }) {
  const { userData } = useUser();
  const uid = userData.data.data().uid;
    
  const { deleteComment } = useDeleteComment(postId, item.commentId, page, postCachedLocation);

  return (
    <div className="my-2 bg-custom-pink-300 rounded-sm flex flex-row justify-between items-center p-4 first:mt-0 last:mb-0">
      <div className="flex flex-col w-full">
        <header className="flex justify-between items-center w-full border-b-2 pb-2">
          <div className="flex">
            <img
              className="w-6 h-6 object-cover rounded-full"
              src="https://firebasestorage.googleapis.com/v0/b/tierliz.appspot.com/o/test%2Ftumblr_dcd52407b045254bd57867b80ff5d9b8_8d32fced_540.png?alt=media&token=0623aebd-d476-4cff-a38c-007939def1d9"
            ></img>
            <div className="ml-4 text-sm font-bold text-gray-500">
              {item.userId}
            </div>
          </div>
          <div
            className="flex items-center justify-center w-8 h-8 flex-initial rounded-full bg-custom-pink-500"
            onClick={() => deleteComment() }
          >
            {item.uid == uid && (
              <BinSVG className="w-4 h-4 fill-current text-gray-600 hover:text-red-600 cursor-pointer" />
            )}
          </div>
        </header>
        <div className="text-sm mt-2">{item.content}</div>
      </div>
    </div>
  );
}

export default SingleComment;
