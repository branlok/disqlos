import React from "react";
import TimeAgo from "react-timeago";
import ImageCard from "./ImageCard";

function ContentBody({ postContent, date, numberOfChildren, story, hasImage }) {
  return (
    <div
      className={`relative text-s font-gray-700 w-full bg-custom-pink-550 dark:bg-cb-3 flex flex-col justify-center items-center text-center ml-2 rounded-md p-4 py-10 overflow-hidden my-2 `}
    >
      {story && (
        <h1 className="absolute top-2 left-2 mb-0.5 text-white font-bold text-sm rounded-md bg-custom-pink-1100 dark:bg-cb-10 px-2 py-0.5 ">
          Story
        </h1>
      )}
      {hasImage && (
        <div className="cursor-pointer w-full h-full object-cover transition-all pb-2 px-2 mt-2 bg-custom-pink-400 dark:bg-cb-1 rounded-lg">
          <ImageCard imageUrl={hasImage} />
        </div>
      )}
      <p className="font-bold text-sm text-gray-600 mt-4  dark:text-gray-300 ">
        {postContent}
      </p>
      <div className="flex flex-col md:flex-row w-full mt-1 justify-center items-center">
        <p className="text-xs text-gray-400 mx-1">Posted</p>{" "}
        <TimeAgo
          className="text-xs text-gray-400"
          date={date.toDate()}
          minPeriod="30"
        />
        {numberOfChildren && (
          <div className="text-xs text-gray-400 mx-1">
            {" "}
            with {numberOfChildren} posts
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentBody;
