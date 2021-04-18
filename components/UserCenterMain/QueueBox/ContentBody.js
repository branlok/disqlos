import Link from "next/link";
import React, { useState } from "react";
import TimeAgo from "react-timeago";
import { useAuth } from "../../../utils/auth";
import useDeleteQueues from "../utils/useDeleteQueues";
function ContentBody({ postContent, queueId, numberOfChildren, createdOn }) {
  const { userId } = useAuth();
  const { deleteQueueMutation } = useDeleteQueues(userId, queueId);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  return (
    <div className="relative text-s font-gray-700 bg-custom-pink-550  dark:bg-cb-3  w-full flex flex-col justify-between items-center text-center rounded-md px-2  my-2 overflow-hidden">
      <h1 className="my-2 h-full items-center flex justify-center text-lg w-full font-bold py-3 bg-gray-100  dark:bg-cb-2 dark:text-gray-200 rounded-md px-4 text-gray-700">
        {postContent}
      </h1>
      <div className="text-gray-500 text-xs border-gray-300 dark:bg-cb-4 dark:text-gray-200 flex justify-center items mx-2 bg-gray-200 p-0.5 rounded-md">
        <div className="mx-2">
          Created <TimeAgo date={createdOn.toDate()} minPeriod="30" />
        </div>
        <div className="mx-2"> {numberOfChildren} Posts</div>
      </div>
      <div className="relative w-full flex-initial flex flex-col justify-center items-center pb-4 bg-white-100 border-gray-400 mt-4  ">
        {/* <button
          onClick={() => setQueueId(queueId)}
          className=" w-32 mx-2 rounded-md text-white py-2 text-sm my-1 font-bold bg-custom-pink-1000 hover:shadow-md"
                    Use Space
        </button>
        > */}
        <button
          className=" w-32 mx-2 rounded-md text-white py-2 text-sm my-1 font-bold bg-custom-pink-1000 hover:shadow-md"
        >
          <Link href={`queue?id=${queueId}`}>
            <a>UseSpace</a>
          </Link>
        </button>

        <button
          onClick={() => setShowConfirmDelete(true)}
          className="text-xs text-red-1000 opacity-50 hover:opacity-100 transition font-bold dark:text-white"
        >
          Delete
        </button>
      </div>
      {showConfirmDelete && (
        <div className="absolute left-0 top-0 h-full w-full bg-gray-100 flex flex-col justify-center items-center text-black">
          <h1 className="text-lg font-bold">Confirm Delete?</h1>
          <div className="flex justify-center items-center">
            <button
              onClick={() => setShowConfirmDelete(false)}
              className=" dark:border-transparent rounded-md px-2 py-1 hover:bg-green-500 hover:text-white m-2"
            >
              Return
            </button>
            <button
              onClick={() => deleteQueueMutation.mutate()}
              className="border dark:border-transparent rounded-md px-2 py-1 bg-gray-800 text-white hover:bg-red-500 hover:text-white m-2"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentBody;
