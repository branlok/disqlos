import React, { useEffect } from "react";
import useQueuedPostGetters from "./useQueuedPostGetters";
import QueuePost from "./QueuePost";
import { useAuth } from "../../../utils/auth";

function QueueBox() {
  const {userId} = useAuth();
  let { ownQueuePostsResponse } = useQueuedPostGetters(userId);

  if (ownQueuePostsResponse.isSuccess) {
    return (
      <div className="w-full mt-2">
        {ownQueuePostsResponse.data.pages.map((page, pageIdx) => {
          return (
            <React.Fragment key={pageIdx + "queueBox"}>
              {page.map((item, entryIdx) => {
                  return <QueuePost key={item.queueId} item={item} />;
              })}
            </React.Fragment>
          );
        })}

{ownQueuePostsResponse.isSuccess && ownQueuePostsResponse.hasNextPage ? (
          <button
            className="font-bold text-lg text-white mt-2 bg-gray-300 rounded-md p-2 hover:bg-gray-700 transition-all dark:bg-cb-10"
            onClick={() => ownQueuePostsResponse.fetchNextPage()}
          >
            "Load More"
          </button>
        ) : ownQueuePostsResponse.data.pages[0].length > 0 ? (
          <button
            className="font-bold text-lg text-white mt-2 bg-gray-300 rounded-md p-2 hover:bg-gray-700 transition-all dark:bg-cb-10"
            onClick={() => ownQueuePostsResponse.fetchNextPage()}
          >
            "End of Results"{" "}
          </button>
        ) : (
          ""
        )}
      </div>
    );
  } else if (ownQueuePostsResponse.isLoading) {
    return (
      <div className=" animate-pulse bg-custom-pink-550 border border-light-blue-300 shadow rounded-md p-4 w-full my-2">
        <div className="animate-pulse bg-custom-pink-550  flex space-x-4 flex justify-center rounded-sm py-8 ">
          Loading
        </div>
      </div>
    );
  } else if (ownQueuePostsResponse.isError) {
    return (
      <div className=" animate-pulse bg-custom-pink-550 border border-light-blue-300 shadow rounded-md p-4 w-full my-2">
        <div className="animate-pulse bg-custom-pink-550  flex space-x-4 flex justify-center rounded-sm py-8 ">
          Something Went Wrong
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default QueueBox;
