import React, { useEffect } from "react";
import BasicPost from "../PostsBox/BasicPost";
import PicturePost from "../PostsBox/PicturePost";
import DancingSvg from "../../../styles/illustrations/Dancing.svg";
import { useAuth } from "../../../utils/auth";
import useMetaQueuePostGetters from "./useMetaQueuePostGetters";
import usePublishQueue from "./usePublishQueue";
import { useQueryClient } from "react-query";
import useGetLeadPost from "./useGetLeadPost";
import Toolbar from "./Toolbar";

import PublishedStatus from "./PublishedStatus";
import { useRouter } from "next/router";

function MetaQueueBox({ queueId }) {
  let { userId } = useAuth();
  let { metaPosts } = useMetaQueuePostGetters(queueId);
  let { publishQueueMutation } = usePublishQueue(userId, queueId);
  let { leadPost } = useGetLeadPost(userId, queueId);

  if (metaPosts.isSuccess && leadPost.isSuccess) {
    return (
      <div className="w-full mt-2 flex-col justify-center items-center pb-80">
        <Toolbar
        metaPosts={metaPosts}
        leadPost={leadPost}
        userId={userId}
          publishQueueMutation={publishQueueMutation}
          lastPublished={leadPost.data?.lastPublishedTime
            ?.toDate()
            .toDateString()}
        />

        {/* {leadPost.isSuccess && !leadPost.data.queue && (
          <div className="p-4 my-4 h-20 w-full rounded-md bg-custom-pink-1100 justify-center items-center flex text-white transition cursor-pointer text-center">
            This story has been published once before, click here to remove it
            from public. <br /> You may view published posts here
          </div>
        )} */}
        {metaPosts.data.map((item) => {
          if (item.type == "text")
            return (
              <div className="relative">
                <BasicPost
                  queuedPost={true}
                  key={item.postId}
                  item={item}
                  queueId={queueId}
                />
                <PublishedStatus item={item} leadPost={leadPost} />
              </div>
            );
          if (item.type == "image")
            return (
              <PicturePost
                queuedPost={true}
                key={item.postId}
                item={item}
                queueId={queueId}
              />
            );
        })}
        {/* {metaPosts.data.length > 0 && (
          <button
            onClick={() => publishQueueMutation.mutate()}
            className="h-20 w-full rounded-md bg-custom-pink-1100 justify-center items-center flex text-white hover:bg-custom-pink-1000 transition cursor-pointer font-bold"
          >
            Publish Story{" "}
            {leadPost.isSuccess && !leadPost.data.queue && "Again!"}
          </button>
        )} */}
        {metaPosts.data.length == 0 && (
          <div className="pt-20">
            <p className="font-mono text-center text-sm md:text-2xl lg:text-4xl mb-8 dark:text-white">
              This is a private space. <br /> You can post here, create your
              story before publishing
            </p>
            {/* <DancingSvg className="w-1/2 h-1/2 m-auto" />{" "} */}
          </div>
        )}
      </div>
    );
  } else if (metaPosts.isLoading) {
    return <div>loading</div>;
  } else {
    return <div> error </div>;
  }
}

export default MetaQueueBox;
