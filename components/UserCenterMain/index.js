import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import ProfileNav from "./ProfileNav";

import PostMaker from "./PostMaker";
import PostsBox from "./PostsBox/index";

import QueueBox from "./QueueBox/index";
import QueuePostMaker from "./QueueBox/QueuePostMaker";

import MetaQueuePostMaker from "./MetaQueueBox/MetaQueuePostMaker";
import MetaQueueBox from "./MetaQueueBox/index";
import ProfileExplore from "./ProfileExplore";
import RecommendUsers from "./RecommendUsers";

function UserCenterMain({ targetId, userId }) {
  const router = useRouter();
  const { tab, id } = router.query;
  const { exploreId } = router.query;
  const [directive, setDirective] = useState(""); //submap of user's content 1. View Posts [filters], StoryMode

  const [recommended, setRecommended] = useState(true);

  useEffect(() => {
    //user
    if (exploreId) {
      setDirective("userPosts");
    }
    //dashbaord
    if (tab == "feed") {
      setDirective("feed");
    }
    if (tab == "posts") {
      setDirective("dashboardPosts");
    }
    if (tab == "queue") {
      setDirective("queue");
    }
  });

  if (directive === "dashboardPosts") {
    return (
      <div className="h-full w-full flex-initial dark:bg-cb-2 bg-gray-100  dark:bg-cb-1 dark:border-cb-4 transition-colors border-l border-r border-gray-200 pt-4 overflow-scroll no-scrollbar overscroll-contain smoothScroll">
        <div id="top" className="w-11/12 sm:w-3/4 m-auto pb-40 mb-40 ">
          <Header />
          <PostMaker setDirective={setDirective} />
          <ProfileNav directive={directive} setDirective={setDirective} />
          <PostsBox directive={directive} targetId={userId} />
        </div>
      </div>
    );
  } else if (directive === "feed") {
    return (
      <div className="h-full w-full flex-initial bg-custom-gray-500 dark:bg-cb-1 dark:border-cb-4 transition-colors border-l border-r pt-4 overflow-scroll no-scrollbar overscroll-contain smoothScroll">
        <div id="top" className="w-11/12 sm:w-3/4 m-auto pb-40 mb-40 ">
          <ProfileNav directive={directive} setDirective={setDirective} />
          {recommended && <RecommendUsers setRecommended={setRecommended} />}
          <PostsBox directive={directive} />
        </div>
      </div>
    );
  } else if (directive === "queue") {
    return (
      <div className="h-full w-full flex-initial bg-custom-gray-500 border-l dark:bg-cb-1 dark:border-cb-4 transition-colors border-r pt-4 overflow-scroll no-scrollbar overscroll-contain ">
        <div id="top" className="w-11/12 sm:w-3/4 m-auto pb-60 mb-40">
          <Header />
          {id ? (
            <MetaQueuePostMaker queueId={id} />
          ) : (
            <QueuePostMaker directive={directive} />
          )}
          <ProfileNav directive={directive} setDirective={setDirective} />
          {id ? <MetaQueueBox queueId={id} /> : <QueueBox />}
        </div>
      </div>
    );
  } else if (directive == "userPosts") {
    return <ProfileExplore directive={directive} targetId={targetId} />;
  } else {
    return <div></div>;
  }
}

export default UserCenterMain;
