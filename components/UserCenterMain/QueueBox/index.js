import React, { useEffect } from "react";
import useQueuedPostGetters from "./useQueuedPostGetters";
import QueuePost from "./QueuePost";
import { useAuth } from "../../../utils/auth";
import LoadSpinner from "../../../styles/svg/spinner.svg";

function QueueBox() {
  const { userId } = useAuth();
  let { ownQueuePostsResponse } = useQueuedPostGetters(userId);

  if (ownQueuePostsResponse.isSuccess) {
    return (
      <div className="w-full mt-2 xl:flex xl:flex-wrap ">
        {ownQueuePostsResponse.data.pages.map((page, pageIdx) => {
          return (
            <React.Fragment key={pageIdx + "queueBox"}>
              {page.map((item, entryIdx) => {
                return <QueuePost key={item.queueId} item={item} />;
              })}
            </React.Fragment>
          );
        })}

        {ownQueuePostsResponse.isSuccess &&
        ownQueuePostsResponse.hasNextPage ? (
          <button
            className="w-full focus:outline-none font-bold text-lg text-white mt-2 bg-gray-300 rounded-md p-2 hover:bg-gray-700 transition-all dark:bg-cb-10"
            onClick={() => ownQueuePostsResponse.fetchNextPage()}
          >
            "Load More"
          </button>
        ) : ownQueuePostsResponse.data.pages[0].length > 0 ? (
          <button
            className="w-full focus:outline-none font-bold text-lg text-white mt-2 bg-gray-300 rounded-md p-2 hover:bg-gray-700 transition-all dark:bg-cb-10"
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
      <div className="h-60 w-full rounded-md  justify-center flex flex-col items-center mx-1  rounded-sm rounded-md ">
        <LoadSpinner className="animate-spin fill-current text-gray-400 " />
        <p className=" dark:text-gray-300 font-bold my-2 ">Loading </p>
      </div>
    );
  } else if (ownQueuePostsResponse.isError) {
    return (
      <div className="h-60 w-full rounded-md  justify-center flex flex-col items-center mx-1  rounded-sm rounded-md ">
        <p className=" dark:text-gray-300 font-bold my-2 ">Something Went Wrong </p>
      </div>
    );
  } else {
    return null;
  }
}

export default QueueBox;
