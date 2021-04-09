import React, { useEffect, useState, useRef } from "react";
import BasicPost from "./BasicPost";
import PicturePost from "./PicturePost";
import usePostGetters from "./usePostGetters";

function PostsBox({ directive }) {
  let { ownPostsResponse, followPostsResponse } = usePostGetters();

  if (directive == "posts") {
    if (ownPostsResponse.isSuccess) {
      return (
        <div className="w-full mt-2 flex flex-col pb-40">
          {ownPostsResponse.data.pages.map((page, pageIdx) => {
            return (
              <React.Fragment key={pageIdx + "posts"}>
                {page.map((item, entryIdx) => {
                    //{pageIdx,entryIdx} used for updating query-cache in userLikedPost.js
                  if (item.type == "text")
                    return <BasicPost key={item.postId} item={item} page={{pageIdx,entryIdx}} directory={"posts"}  />;
                  if (item.type == "image")
                    return <PicturePost key={item.postId} item={item} page={{pageIdx,entryIdx}} directory={"posts"}   />;
                })}
              </React.Fragment>
            );
          })}
          <button
            className="font-bold text-lg text-white mt-2 bg-gray-300 rounded-md p-2 hover:bg-gray-700 transition-all"
            onClick={() => ownPostsResponse.fetchNextPage()}
          >
            {ownPostsResponse.isSuccess && ownPostsResponse.hasNextPage ? "Load More" : ownPostsResponse.data.pages[0].length > 0 ? "End of Results" : ""}
          </button>
        </div>
      );
    } else {
      return null;
    }
  } else if (directive == "feed") {
    if (followPostsResponse.isSuccess) {
        return (
            <div className="w-full mt-2 flex flex-col pb-40">
              {followPostsResponse.data.pages.map((page, pageIdx) => {
                return (
                  <React.Fragment key={pageIdx + "posts"}>
                    {page.map((item, entryIdx) => {
                        //{pageIdx,entryIdx} used for updating query-cache in userLikedPost.js
                      if (item.type == "text")
                        return <BasicPost key={item.postId} item={item} page={{pageIdx,entryIdx}} directory={"feed"} />;
                      if (item.type == "image")
                        return <PicturePost key={item.postId} item={item} page={{pageIdx,entryIdx}} directory={"feed"}  />;
                    })}
                  </React.Fragment>
                );
              })}
              <button
                className="font-bold text-lg text-white mt-2 bg-gray-300 rounded-md p-2 hover:bg-gray-700 transition-all"
                onClick={() => followPostsResponse.fetchNextPage()}
              >
                {followPostsResponse.isSuccess && followPostsResponse.hasNextPage ? "Load More" : followPostsResponse.data.pages[0].length > 0 ? "End of Results" : ""}
              </button>
            </div>
          )

    } else {
      return null;
    }
  }
}

export default PostsBox;


    //   return (
    //     <div className="w-full mt-2">
    //       {followPostsResponse.data.map((item) => {
    //         if (item.type == "text")
    //           return <BasicPost key={item.postId} item={item} />;
    //         if (item.type == "image")
    //           return <PicturePost key={item.postId} item={item} />;
    //       })}
    //     </div>
    //   );