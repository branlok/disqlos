import React from "react";
import targetUserData from "./PublicHeader";
import PostContainer from "./PostContainer";
import useGetUserPosts from "./utils/useGetUserPosts";

function PublicUserPage({ targetUserData, userPosts, userId }) {
  const parsedUserPosts = JSON.parse(userPosts);
  const { ownPostsResponse } = useGetUserPosts(targetUserData.uid, parsedUserPosts);
  
  return (
    <div className="relative w-full h-full m-auto flex-col flex-start items-center justify-start overflow-scroll no-scrollbar overscroll-contain smoothScroll ">
      <div className="w-full md:w-3/5 m-auto p-2">
        <targetUserData targetUserData={targetUserData} />
        <PostContainer ownPostsResponse={ownPostsResponse} />
      </div>
    </div>
  );
}

export default PublicUserPage;
