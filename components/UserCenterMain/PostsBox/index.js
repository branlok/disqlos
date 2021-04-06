import React, { useEffect } from "react";
import BasicPost from "./BasicPost";
import PicturePost from "./PicturePost";
import { useAuth } from "../../../utils/auth";
import usePostGetters from "./usePostGetters";

function PostsBox({ directive }) {
  let { userId } = useAuth();
  let { ownPostsResponse, followPostsResponse } = usePostGetters();

  useEffect(() => {
      console.log(followPostsResponse.data);
  })

  if (directive == "posts") {
    if (ownPostsResponse.isSuccess) {
      return (
        <div className="w-full mt-2">
          {ownPostsResponse.data.map((item) => {
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
      )
    } else {
        return null;
    }
  }
}

export default PostsBox;
