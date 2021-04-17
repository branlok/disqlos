import React from "react";
import BasicPost from "./BasicPost";
import PicturePost from "./PicturePost";
import usePostGetters from "./usePostGetters";

function PostsBox({ directive, targetId }) {
  //if we are on explore/uid
  let { getPosts } = usePostGetters(directive, targetId);
  console.log(directive, targetId);
  if (getPosts.status == "success")
    return (
      <div className="w-full mt-2 flex flex-col pb-40">
        {getPosts.data.pages.map((page, pageIdx) => {
          return (
            <React.Fragment key={pageIdx + directive + targetId}>
              {page.map((item, entryIdx) => {
                //{pageIdx,entryIdx} used for updating query-cache in userLikedPost.js
                if (item.type == "text")
                  return (
                    <BasicPost
                      key={item.postId}
                      item={item}
                      page={{ pageIdx, entryIdx }}
                      directory={directive}
                      targetId={targetId}
                    />
                  );
                if (item.type == "image")
                  return (
                    <PicturePost
                      key={item.postId}
                      item={item}
                      page={{ pageIdx, entryIdx }}
                      directory={directive}
                      targetId={targetId}
                    />
                  );
              })}
            </React.Fragment>
          );
        })}

        {getPosts.isSuccess && getPosts.hasNextPage ? (
          <button
            className="font-bold text-lg text-white mt-2 bg-gray-300 rounded-md p-2 hover:bg-gray-700 transition-all dark:bg-cb-10"
            onClick={() => getPosts.fetchNextPage()}
          >
            "Load More"
          </button>
        ) : getPosts.data.pages[0].length > 0 ? (
          <button
            className="font-bold text-lg text-white mt-2 bg-gray-300 rounded-md p-2 hover:bg-gray-700 transition-all dark:bg-cb-10"
            onClick={() => getPosts.fetchNextPage()}
          >
            "End of Results"{" "}
          </button>
        ) : (
          ""
        )}
      </div>
    );

  if (getPosts.status == "loading") return <div>23</div>;
  if (getPosts.status == "error") return <div>error</div>;
}

export default PostsBox;
