import React from "react";
import BasicPost from "./BasicPost";
import PicturePost from "./PicturePost";
import usePostGetters from "./usePostGetters";
import LoadSpinner from "../../../styles/svg/spinner.svg";
import PlaceholderPost from "./PlaceholderPost";

function PostsBox({ directive, targetId }) {
  //if we are on explore/uid
  let { getPosts } = usePostGetters(directive, targetId);
  console.log(directive, targetId);

  if (getPosts.status == "success") {
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
              <PlaceholderPost postExists={getPosts.data.pages[0].length} />
            </React.Fragment>
          );
        })}

        {getPosts.isSuccess && getPosts.hasNextPage ? (
          <button
            className="font-bold text-lg text-white mt-2 bg-gray-700 rounded-md p-2 hover:bg-gray-700 transition-all dark:bg-cb-10"
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
  } else if (getPosts.status == "loading") {
    return (
      <div className="h-60 w-full rounded-md  justify-center flex flex-col items-center mx-1  rounded-sm rounded-md ">
        <LoadSpinner className="animate-spin fill-current text-gray-400 " />
        <p className=" dark:text-gray-300 font-bold my-2 ">Loading </p>
      </div>
    );
  } else if (getPosts.status == "error") {
    return (
      <div className="h-60 w-full rounded-md  justify-center flex flex-col items-center mx-1  rounded-sm rounded-md ">
        <LoadSpinner className="animate-spin fill-current text-gray-400 " />
        <p className=" dark:text-gray-300 font-bold my-2 ">Error </p>
      </div>
    );
  }
}

export default PostsBox;
