import React from "react";
import BasicPost from "../../UserCenterMain/PostsBox/BasicPost";
import PicturePost from "../../UserCenterMain/PostsBox/PicturePost";
import useGetTargetPosts from "../QueryStateMangement/useGetTargetPosts";

function PostsBox({ targetId }) {
  const { paginatedPosts } = useGetTargetPosts(targetId);
  const sortPostType = (item, entryIdx, pageIdx) => {
    if (item.type == "text")
      return (
        <BasicPost
          key={item.postId}
          item={item}
          page={{ pageIdx, entryIdx }}
          targetId={targetId}
        />
      );
    if (item.type == "image")
      return (
        <PicturePost
          key={item.postId}
          item={item}
          page={{ pageIdx, entryIdx }}
          targetId={targetId}
        />
      );
  };
  console.log(paginatedPosts.data);
  return (
    <div>
      {paginatedPosts.isSuccess &&
        paginatedPosts.data.pages.map((page, pageIdx) => {
          return (
            <React.Fragment key={pageIdx + "targetUserPosts"}>
              {page.map((item, entryIdx) => {
                return sortPostType(item, entryIdx, pageIdx);
              })}
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default PostsBox;
