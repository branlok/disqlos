import React, { useState } from "react";
import ProfileCircle from "../ProfileCircle";
import TimeAgo from "react-timeago";

const sample = {
  hasImage: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
  postContent: "Demo",
  displayName: "Jason",
  primaryProfileImage:
    "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
};

function PostDemo({ hasImage, postContent, displayName, primaryProfileImage }) {
  const [date, setDate] = useState(Date.now());

  return (
    <div className=" w-full">
      <div className="relative mx-5 w-96 px-2 bg-custom-pink-300 dark:bg-cb-4 rounded-md shadow-md flex flex-col child last:mb-0 transition ">
        <div className="relative flex child">
          <div className=" w-20 md:w-28 flex-none bg-custom-pink-550  dark:bg-cb-3 dark:text-gray-200  flex flex-col justify-center items-center rounded-md my-2 py-4">
            <div className="w-16 h-16">
              <ProfileCircle imageURL={primaryProfileImage} />
            </div>
            <div
              className={`text-xs rounded p-1 px-2 m-1 text-custom-pink-900 cursor-pointer`}
            >
              Unfollow
            </div>
            <p className="text-xs font-bold text-gray-600  dark:text-gray-300 ">
              {displayName}
            </p>
          </div>

          <div
            className={`relative text-s font-gray-700 w-full bg-custom-pink-550 dark:bg-cb-3 flex flex-col justify-center items-center text-center ml-2 rounded-md p-4 py-10 overflow-hidden my-2 `}
          >
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
                date={date}
                minPeriod="30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDemo;
