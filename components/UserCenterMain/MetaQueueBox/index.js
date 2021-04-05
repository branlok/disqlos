import React, { useEffect } from "react";
import BasicPost from "../PostsBox/BasicPost";
import PicturePost from "../PostsBox/PicturePost";
import DancingSvg from "../../../styles/illustrations/Dancing.svg";
import { useAuth } from "../../../utils/auth";
import useMetaQueuePostGetters from "./useMetaQueuePostGetters";

function MetaQueueBox({ queueId, setQueueId }) {
  let { userId } = useAuth();
  let { metaPosts } = useMetaQueuePostGetters(queueId);

  useEffect(() => {
    console.log(metaPosts, "asdfasdfasdfasdf");
    console.log(queueId);
    return () => {
      setQueueId(false);
    };
  }, []);

  if (metaPosts.isSuccess) {
    return (
      <div className="w-full mt-2 flex-col justify-center items-center pb-80">
        {metaPosts.data.map((item) => {
          if (item.type == "text")
            return (
              <BasicPost useComments={false} key={item.postId} item={item} />
            );
          if (item.type == "image")
            return (
              <PicturePost useComments={false} key={item.postId} item={item} />
            );
        })}
        {metaPosts.data.length == 0 && (
          <div className="pt-20">
            <p className="font-mono text-center text-sm md:text-2xl lg:text-4xl mb-8">
              {" "}
              This is your private space, <br /> start posting the moment!
            </p>
            <DancingSvg className="w-1/2 h-1/2 m-auto" />{" "}
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
