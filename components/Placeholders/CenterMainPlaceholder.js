import React from "react";
import PostPlaceholder from "./BasicElements/PostPlaceholder";

function CenterMainPlaceholder() {
  return (
    <div className="h-full w-full flex-initial bg-custom-gray-500 border-l border-r pt-4 overflow-scroll no-scrollbar overscroll-contain smoothScroll">
      <div className="w-full h-full mt-2 flex flex-col pb-40">
        <div className="w-3/4 xl:w-4/6 m-auto pb-40 mb-40 ">
          <PostPlaceholder />
          <PostPlaceholder />
          <PostPlaceholder />
          <PostPlaceholder />
          <PostPlaceholder />
        </div>
      </div>
    </div>
  );
}

export default CenterMainPlaceholder;
