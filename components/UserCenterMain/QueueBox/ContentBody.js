import React from "react";
import TimeAgo from "react-timeago";
function ContentBody({
  postContent,
  setQueueId,
  queueId,
  numberOfChildren,
  createdOn,
}) {
  return (
    <div className="relative text-s font-gray-700 bg-custom-pink-550 w-full flex flex-col justify-between items-center text-center rounded-md p-6  my-2 overflow-hidden">
      <h1 className="my-2 h-full items-center flex justify-center text-lg w-full font-bold py-3 bg-gray-100 rounded-md px-4">
        {postContent}{" "}
      </h1>
      <div className="relative w-full flex-initial flex flex-col justify-center items-center py-4 bg-white-100">
        <button
          onClick={() => setQueueId(queueId)}
          className=" w-32 mx-2 rounded-md text-white py-2  my-1 font-bold bg-custom-pink-1000"
        >
          Use Space
        </button>
        <div className="text-gray-500 text-xs border-gray-300  w-3/4">
          Created <TimeAgo date={createdOn.toDate()} minPeriod="30" />
        </div>
      </div>
      <div className="absolute bottom-2 right-1">
          <div className=" mx-1 rounded-md text-gray-700 text-sm py-1 px-2 ">
            {numberOfChildren} Posts
          </div>
        </div>
      {/* <div className="text-gray-700 border rounded-md p-1 px-4 border-gray-600 text-sm">
              2 post`
          </div> */}
    </div>
  );
}

export default ContentBody;
