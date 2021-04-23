import React, { useState } from "react";
import TimeAgo from "react-timeago";
function Spaces({ numberOfChildren, postContent, setShowList, target }) {
  const [date, setdate] = useState(Date.now());

  return (
    <div className="mb-4 w-full px-2 h-1/2">
      <div className="h-full max-h-80 bg-custom-pink-300  hover:bg-custom-pink-1000 dark:bg-cb-4  rounded-md shadow-md flex child last:mb-0 transition relative">
        <div className="relative text-s font-gray-700 bg-custom-pink-550  dark:bg-cb-3  mx-2 w-full flex flex-col justify-between items-center text-center rounded-sm px-2  my-2 overflow-hidden">
          <h1 className="my-2 h-full items-center flex justify-center text-lg w-full font-bold py-3 bg-gray-100  dark:bg-cb-2 dark:text-gray-200 rounded-md px-4 text-gray-700">
            {postContent}
          </h1>
          <div className="text-gray-500 text-xs border-gray-300 dark:bg-cb-4 dark:text-gray-200 flex justify-center items mx-2 bg-gray-200 p-0.5 rounded-md">
            <div className="mx-2">
              Created <TimeAgo date={date} minPeriod="30" />
            </div>
            <div className="mx-2"> {numberOfChildren} Posts</div>
          </div>
          <div className="relative w-full flex-initial flex flex-col justify-center items-center pb-4 bg-white-100 border-gray-400 mt-4  ">
            <button onClick={() => setShowList(target)}className=" w-32 mx-2 rounded-md text-white py-2 text-sm my-1 font-bold bg-custom-pink-1000 hover:shadow-md hover:bg-custom-pink-1100 transition-all">
              <a>Use Space</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spaces;
