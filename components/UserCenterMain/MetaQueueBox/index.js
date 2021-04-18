import React, { useEffect } from "react";
import BasicPost from "../PostsBox/BasicPost";
import PicturePost from "../PostsBox/PicturePost";
import DancingSvg from "../../../styles/illustrations/Dancing.svg";
import { useAuth } from "../../../utils/auth";
import useMetaQueuePostGetters from "./useMetaQueuePostGetters";
import usePublishQueue from "./usePublishQueue";
import { useQueryClient } from "react-query";

function MetaQueueBox({ queueId }) {
  let { userId } = useAuth();
  let { metaPosts } = useMetaQueuePostGetters(queueId);
  let {publishQueueMutation} = usePublishQueue(userId, queueId);

  // useEffect(() => {
  //   return () => {
  //       //queueId set false is for resetting the tab
  //     setQueueId(false);
  //   };
  // }, []);

  

  if (metaPosts.isSuccess) {
    return (
      <div className="w-full mt-2 flex-col justify-center items-center pb-80">
        {/* <div className="my-4 h-20 w-full rounded-md bg-custom-pink-1100 justify-center items-center flex text-white hover:bg-custom-pink-1000 transition cursor-pointer text-center">This story has been published once before, do you want to remove it from public? <br/> Or you can also view post here</div> */}
        {metaPosts.data.map((item) => {
          if (item.type == "text")
            return (
              <BasicPost queuedPost={true} key={item.postId} item={item} queueId={queueId}/>
            );
          if (item.type == "image")
            return (
              <PicturePost queuedPost={true} key={item.postId} item={item} queueId={queueId}/>
            );
        })}
        {<button onClick={() => publishQueueMutation.mutate()} className="h-20 w-full rounded-md bg-custom-pink-1100 justify-center items-center flex text-white hover:bg-custom-pink-1000 transition cursor-pointer">Publish Space</button>}
        {metaPosts.data.length == 0 && (
          <div className="pt-20">
            <p className="font-mono text-center text-sm md:text-2xl lg:text-4xl mb-8 dark:text-white">
              {" "}
              This is your private space, <br /> start posting the moment!
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
