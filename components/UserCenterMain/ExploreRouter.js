import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProfileNav from "./ProfileNav";

import PostsBox from "./PostsBox/index";

//can be called mainExplore
function ExploreRouter({ targetUserData, userPosts }) {
  const router = useRouter();
  const { exploreid } = router.query;
  console.log(exploreid);

  const [directive, setDirective] = useState("feed"); 

  return (
    <div className="h-full w-full flex-initial bg-custom-gray-500 border-l border-r  px-2 md:px-20 pt-4 overflow-scroll no-scrollbar">
      <ProfileNav directive={directive} setDirective={setDirective} />
      <PostsBox directive={directive} />
    </div>
  );

}

export default ExploreRouter;
