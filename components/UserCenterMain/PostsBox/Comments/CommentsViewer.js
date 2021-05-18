import React, { useEffect } from "react";
import useCommentsReq from "./useCommentsReq";
import SingleComment from "./SingleComment";
import MessageBubble from "../../../../styles/svg/messsagebubble.svg";
import { useQueryClient } from "react-query";
function CommentsViewer({
  postId,
  viewerOpened,
  postCachedLocation,
  numberOfComments,
  commentsResponse,
  directory,
  targetId,
}) {
  //const { commentsResponse } = useCommentsReq(postId, viewerOpened);
  const queryClient = useQueryClient();

  let NoCommentsMessage = (
    <div className="flex justify-center flex-col items-center font-xs py-2">
      <MessageBubble className="mb-2" /> No one has replied yet, be the first!
    </div>
  );

  if (commentsResponse.isSuccess) {
    return (
      <div className="h-full w-full py-2 bg-custom-pink-550 mb-2 rounded-md dark:bg-cb-4">
        <div className="max-h-56 px-2 rounded-md overflow-y-scroll no-scrollbar flex flex-col ">
          {commentsResponse.data.pages.length == "0" && <NoCommentsMessage />}
          {commentsResponse.data.pages.map((page, pageIdx) => {
            return (
              <React.Fragment key={pageIdx + postId}>
                {page.map((comment, commentIdx) => {
                  return (
                    <SingleComment
                      key={comment.commentId}
                      postId={postId}
                      item={comment}
                      postCachedLocation={postCachedLocation}
                      page={{ pageIdx, commentIdx }}
                      directory={directory}
                      targetId={targetId}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
          {
            <div className="w-full flex justify-center items-center">
              {commentsResponse.hasNextPage ? (
                <button
                  className="w-full px-2 my-2 border rounded-md  font-bold text-gray-600 cursor-pointer hover:bg-gray-600 active:bg-gray-800 hover:text-white transition-all"
                  onClick={() => commentsResponse.fetchNextPage()}
                >
                  Load More
                </button>
              ) : (
                <button
                  onClick={() =>
                    queryClient.invalidateQueries(["fetchComments", postId])
                  }
                  className="w-full px-2 my-2 border rounded-md  font-bold text-gray-600 cursor-pointer hover:bg-gray-600 active:bg-gray-800 hover:text-white transition-all dark:bg-cb-3 dark:border-cb-3 dark:text-gray-500"
                >
                  No Posts
                </button>
              )}
            </div>
          }
        </div>
      </div>
    );
  } else {
    return (
      <div className="animate-pulse  h-full w-full py-2 bg-custom-pink-550 mb-2 rounded-md ">
        <div className="max-h-56 px-2 rounded-md overflow-y-scroll no-scrollbar">
          <div
            className="w-full px-2 my-2 border rounded-md  font-bold text-gray-600 text-center transition-all"
          >
            Loading
          </div>
        </div>
      </div>
    );
  }
}

/* 
NOTE:
----
due to nature of reactquery, the logic above might be confusing
0. we want to optimize fetching the server, so we opt in manipulating clientside data without revalidating with server source of truth. otherwise, 
 see useDeletePost.js, it does exactly that. at the cost of refetching from server.
1. we are using numberOfComments as the truth for ui displaying refresh.
2. we do this because useInfiniteQuery returns a an n amount size array of comments, the problems comes from here i.e. if we set usecommentsReq to limit of 2
when user deletes his 2 comments. hasNextPage will say: because it links to the last array length to determine whther its fetchable. messing wit hteh cache causes
a misinterpretation.
3. this bug is only noticable with a low limiter and if comments are all from the user.

solution 1: we can rehydrate users comments, when all comments are deleted.
solution 2: we can add extra specification to the getNextPageParam in useCommentsReq.
solution 3: current presentation, the bug is now detour to new feature - adding the refresh button, allows for more user finer control, albiet need to implement a throttler.


Choosing solution 3 doesnt let me get away solving the problem, I wont be able to reuse the logic for userPosts, so i need to fix in that area of the code.

*/

export default CommentsViewer;
