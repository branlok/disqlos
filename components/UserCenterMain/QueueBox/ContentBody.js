import React from "react";

function ContentBody({ postContent, setQueueId, queueId }) {
  return (
    <div className="text-s font-gray-700 bg-custom-pink-550 w-full flex flex-col justify-center items-center text-center  rounded-md p-6  my-2 overflow-hidden">
      <div className="text-gray-500 text-xs my-2 border-gray-300  w-3/4">
        January 31, 2019
      </div>
      <div className="my-2">{postContent} </div>
      <div className="flex-col md:flex-row items-center justify-center w-full border">
        <button
          onClick={() => setQueueId(queueId)}
          className=" w-32 mx-2 rounded-md text-gray-800 py-2  my-2 font-bold bg-gray-300 hover:bg-green-100"
        >
          Use Space
        </button>
        <button
          onClick={() => setQueueId(queueId)}
          className="w-32 mx-2 rounded-md text-white py-2  my-2 font-bold bg-custom-pink-1000 "
        >
          Publish
        </button>
      </div>

      {/* <div className="text-gray-700 border rounded-md p-1 px-4 border-gray-600 text-sm">
              2 post
          </div> */}
    </div>
  );
}

export default ContentBody;
