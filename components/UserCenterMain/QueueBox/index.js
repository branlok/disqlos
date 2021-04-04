import React, { useEffect } from "react";
import { useAuth } from "../../../utils/auth";
import usePostGetters from "./usePostGetters";
import QueuePost from "./QueuePost";
function QueueBox() {
  let { userId } = useAuth();
  let { ownPostsResponse } = usePostGetters();
  if (ownPostsResponse.isSuccess) {
    return (
      <div className="w-full mt-2">
        {ownPostsResponse.data.map((item) => {
          return <QueuePost key={item.queueId} item={item} />;
        })}
      </div>
    );
  } else {
      return null;
  }
}

export default QueueBox;
