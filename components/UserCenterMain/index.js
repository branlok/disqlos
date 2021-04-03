import React, { useState } from "react";
import Header from "./Header";
import PostMaker from "./PostMaker";
import ProfileNav from "./ProfileNav";
import PostsBox from "./PostsBox/index";
function UserCenterMain() {
  const [user, setUser] = useState("owner"); //username in database
  const [directive, setDirective] = useState("posts"); //submap of user's content 1. View Posts [filters], StoryMode

  if (directive === "posts") {
    return (
      <div className="h-full w-full flex-initial bg-custom-gray-500 border-l border-r z-0 pt-4 overflow-scroll no-scrollbar overscroll-contain ">
        <div className="w-3/4 m-auto">
          <Header />
          <PostMaker />
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
  }
}

export default UserCenterMain;
