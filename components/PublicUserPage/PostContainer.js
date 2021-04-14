import React from "react";
import TextPost from "./TextPost";


function PostContainer({ownPostsResponse}) {
    console.log(ownPostsResponse.status)

  if (ownPostsResponse.isSuccess) {
    return (
      <div className="w-full mt-2 flex flex-col pb-40">
        {ownPostsResponse.data.pages.map((page, pageIdx) => {
          return (
            <React.Fragment key={pageIdx + "posts"}>
              {page.map((item, entryIdx) => {
               
                if (item.type == "text")
                  return (
                    <TextPost key={item.postId} item={item}/>
                    // <BasicPost
                    //   key={item.postId}
                    //   item={item}
                    //   page={{ pageIdx, entryIdx }}
                    //   directory={"posts"}
                    // />
                  );
                if (item.type == "image")
                  return (
                    <p> asdfasdf</p>
                    // <PicturePost
                    //   key={item.postId}
                    //   item={item}
                    //   page={{ pageIdx, entryIdx }}
                    //   directory={"posts"}
                    // />
                  );
              })}
            </React.Fragment>
          );
        })}
        <button
          className="font-bold text-lg text-white mt-2 bg-gray-300 rounded-md p-2 hover:bg-gray-700 transition-all"
          onClick={() => ownPostsResponse.fetchNextPage()}
        >
          {ownPostsResponse.isSuccess && ownPostsResponse.hasNextPage
            ? "Load More"
            : ownPostsResponse.data.pages[0].length > 0
            ? "End of Results"
            : ""}
        </button>
      </div>
    );
  } else {
    return null;
  }
}

export default PostContainer;
