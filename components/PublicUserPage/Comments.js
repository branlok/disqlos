import React from 'react'
import { useQueryClient } from 'react-query';
import SingleComment from './SingleComment';

function Comments({postId, commentsResponse}) {

    const queryClient = useQueryClient();
    if (commentsResponse.isSuccess) {
        return (
            <div className="h-full w-full py-2 bg-custom-pink-550 mb-2 rounded-md ">
              <div className="max-h-56 px-2 rounded-md overflow-y-scroll no-scrollbar flex flex-col">
                {commentsResponse.data.pages.length == "0" && <NoCommentsMessage/>}
                  {commentsResponse.data.pages.map((page, pageIdx) => {
                    return (
                      <React.Fragment key={pageIdx + postId}>
                        {page.map((comment, commentIdx) => {
                          return (
                            <SingleComment
                              key={comment.commentId}
                              item={comment}
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
                          className="px-2 my-2 border rounded-md bg-gray-300 font-bold text-white cursor-pointer"
                          onClick={() => commentsResponse.fetchNextPage()}
                        >
                          Load More
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            queryClient.prefetchQuery(["fetchCommentsPublic", postId])
                          }
                          className="px-2 my-2 text-xs border rounded-md bg-gray-400 font-bold text-white cursor-pointer hover:bg-gray-500 active:bg-gray-700"
                        >
                          Refresh
                        </button>
                      )}
                    </div>
                  }
              </div>
            </div>
          );
    } else {
        return <div>bruh</div>
    }
    
}

export default Comments
