import React, { useEffect } from "react";
import { useAuth } from "../../../utils/auth";
import useQueuedPostGetters from "./useQueuedPostGetters";
import QueuePost from "./QueuePost";

function QueueBox({ setQueueId }) {
  let { ownQueuePostsResponse } = useQueuedPostGetters();

  useEffect(() => {
    console.log("ownpostresponse:", ownQueuePostsResponse.data);
  });

  if (ownQueuePostsResponse.isSuccess) {
    return (
      <div className="w-full mt-2">
        {ownQueuePostsResponse.data.map((item) => {
          return (
            <QueuePost key={item.queueId} item={item} setQueueId={setQueueId} />
          );
        })}
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
      return null
  }
}

export default QueueBox;
