import React, { useState, useEffect } from "react";
import Header from "./Header";
import ProfileNav from "./ProfileNav";

import PostMaker from "./PostMaker";
import PostsBox from "./PostsBox/index";

import QueueBox from "./QueueBox/index";
import QueuePostMaker from "./QueueBox/QueuePostMaker";

import MetaQueuePostMaker from "./MetaQueueBox/MetaQueuePostMaker";
import MetaQueueBox from "./MetaQueueBox/index";

import userFirestoreUserSelf from "../Queries/USERS/firestoreUserSelf";
import userQuery from "../Queries/USERS/firestoreUserSelf";

function UserCenterMain() {
  const [user, setUser] = useState("owner"); //username in database
  const [directive, setDirective] = useState("posts"); //submap of user's content 1. View Posts [filters], StoryMode
  const [queueId, setQueueId] = useState(false);


  if (directive === "posts") {
    return (
      <div className="h-full w-full flex-initial bg-custom-gray-500 border-l border-r z-0 pt-4 overflow-scroll no-scrollbar overscroll-contain ">
        <div className="w-3/4 m-auto">
          <Header />
          <PostMaker setDirective={setDirective} />
          <ProfileNav directive={directive} setDirective={setDirective} />
          <PostsBox />
        </div>
      </div>
    );
  } else if (directive === "feed") {
    return (
      <div className="h-full w-full flex-initial bg-custom-gray-500 border-l border-r z-0 px-2 md:px-20 pt-4 overflow-scroll no-scrollbar">
        <ProfileNav directive={directive} setDirective={setDirective} />
        <PostsBox directive={directive} />
      </div>
    );
  } else if (directive === "queue") {
    return (
      <div className="svgBackground h-full w-full flex-initial bg-custom-gray-500 border-l border-r z-0 pt-4 overflow-scroll no-scrollbar overscroll-contain ">
        <div className="w-3/4 m-auto">
          <Header />
          {queueId ? <MetaQueuePostMaker queueId={queueId}/> : <QueuePostMaker directive={directive} />}
          <ProfileNav directive={directive} setDirective={setDirective} setQueueId={setQueueId}/>
          {queueId ? <MetaQueueBox queueId={queueId} setQueueId={setQueueId}/> : <QueueBox setQueueId={setQueueId}/>}
        </div>
      </div>
    );
  } else {
    return <div>Error</div>;
  }
}

export default UserCenterMain;
