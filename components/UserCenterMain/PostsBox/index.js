import React, { useEffect, useState, useRef } from "react";
import BasicPost from "./BasicPost";
import PicturePost from "./PicturePost";
import { useAuth } from "../../../utils/auth";
import usePostGetters from "./usePostGetters";
import { useQueryClient } from "react-query";

function PostsBox({ directive }) {
  let { ownPostsResponse, followPostsResponse } = usePostGetters();

  useEffect(() => {});

  if (directive == "posts") {
    if (ownPostsResponse.isSuccess) {
      return (
        <div className="w-full mt-2 flex flex-col pb-40">
          {ownPostsResponse.data.pages.map((page) => {
            return (
              <React.Fragment key={page.pageParam}>
                {page.map((item) => {
                  if (item.type == "text")
                    return <BasicPost key={item.postId} item={item} />;
                  if (item.type == "image")
                    return <PicturePost key={item.postId} item={item} />;
                })}
              </React.Fragment>
            );
          })}
          <button
            className="font-bold text-lg text-white mt-10 bg-gray-300 rounded-md p-2 hover:bg-gray-700 transition-all"
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
        <div className="w-full mt-2">
          {followPostsResponse.data.map((item) => {
            if (item.type == "text")
              return <BasicPost key={item.postId} item={item} />;
            if (item.type == "image")
              return <PicturePost key={item.postId} item={item} />;
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default PostsBox;
