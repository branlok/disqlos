import React from "react";
import TimeAgo from "react-timeago";
function ContentBody({ postContent,date }) {
  return (
    <div className="text-s font-gray-700 w-full bg-custom-pink-550  dark:bg-cb-3  flex flex-col justify-center items-center text-center ml-2 rounded-md p-6 overflow-hidden my-2">

      <p className="font-bold text-gray-600 mt-2 dark:text-gray-300">{postContent}</p>
      <TimeAgo
          className="items-center text-xs text-gray-400"
          date={date.toDate()}
          minPeriod="30"
        />  
    </div>
  );
}

export default ContentBody;
