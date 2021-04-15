import React from "react";
import PostsBox from "../PostsBox";
import useGetPortfolio from "../utils/useGetPortfolio";
import PublicHeader from "./PublicHeader";

function ProfileExplore({ directive, targetId }) {
  const { portfolioData } = useGetPortfolio(targetId);

  if (portfolioData.isSuccess) {
    return (
      <div className="h-full w-full flex-initial bg-custom-gray-500 border-l border-r px-2 md:px-20 pt-4 overflow-scroll no-scrollbar">
        <PublicHeader directive={directive} targetId={targetId} portfolioData={portfolioData} />
        <PostsBox directive={directive} targetId={targetId} />
      </div>
    );
  } else {
      return (
        <div className="h-full w-full flex-initial bg-custom-gray-500 border-l border-r px-2 md:px-20 pt-4 overflow-scroll no-scrollbar"></div>
      )
  }
}

export default ProfileExplore;
