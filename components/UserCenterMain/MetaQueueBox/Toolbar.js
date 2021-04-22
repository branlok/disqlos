import { Router, useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useQueryClient } from "react-query";
import CrossSVG from "../../../styles/svg/x.svg";
import ActionSVG from "../../../styles/svg/threedots.svg";
import useDeleteQueues from "../utils/useDeleteQueues";

function Toolbar({
  leadPost,
  metaPosts,
  publishPost,
  lastPublished,
  publishQueueMutation,
  userId,
}) {
  let queryClient = useQueryClient();
  let router = useRouter();
  let [prompt, setPrompt] = useState(false);
  let [deletePrompt, setDeletePrompt] = useState(false);
  let [actionMenu, setActionMenu] = useState(false);
  let [lockDropdown, setLockDropdown] = useState(false);
  

  //Mutations
  const { deleteQueueMutation } = useDeleteQueues(
    userId,
    leadPost.data.queueId,

  );



  const runValidateAndPublish = (bypass) => {
    if (bypass) {
      return publishQueueMutation.mutate(null, {
        onSuccess: () => {
          queryClient.invalidateQueries("dashboardPosts");
          queryClient.invalidateQueries("fromMeta"); //this can be further optimize with setting on the cache
          setPrompt(false);
        },
      });
    }
    if (metaPosts.data.length > 0) {
      if (
        leadPost.data.publishedRecord?.find(
          //using data[0] because thats the latest post
          (i) => i.postId === metaPosts.data[0].postId
        )
      ) {
        setPrompt(true);
        return;
      }
      publishQueueMutation.mutate(null, {
        onSuccess: () => {
          queryClient.invalidateQueries("dashboardPosts");
          queryClient.invalidateQueries("fromMeta");
          // router.push("/dashboard/posts");
        },
      });
    } else {
      alert("you have nothing to publish");
    }
  };

  return (
    <div className="relative h-16 sm:h-12 p-2 my-4  w-full flex  rounded-md border border-gray-200 dark:border-cb-4 bg-gray-100 dark:bg-cb-3  shadow-md dark:text-white items-center justify-between">
      {deletePrompt && (
        <div className=" fixed top-0 left-0 h-screen w-screen bg-gray-500 dark:bg-black bg-opacity-20 z-50 flex justify-center items-center ">
          <div className="opacity-100 shadow-lg border-black w-96 p-4 rounded-md bg-gray-100 dark:bg-cb-4 dark:text-gray-200 flex items-center flex-col p-10">
            <p>Deleting Space</p>
            <button
              onClick={() => {
                deleteQueueMutation.mutate(null, {
                  onSuccess: () => {
                    queryClient.invalidateQueries("fetchQueuedPosts");
                    router.push("/dashboard/queue");
                  },
                });
              }}
              className=" my-2 py-1 flex items-center justify-center rounded-md px-2 bg-custom-pink-1100 text-white font-bold hover:bg-green-400 transition cursor-pointer text-xs md:text-sm"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setActionMenu(false);
                setLockDropdown(false);
                setDeletePrompt(false);
              }}
              className="flex items-center justify-center rounded-md px-2  text-gray-600 font-bold transition cursor-pointer text-xs md:text-sm"
            >
              Back
            </button>
          </div>
        </div>
      )}
      {prompt && (
        <div className=" fixed top-0 left-0 h-screen w-screen bg-gray-500 dark:bg-black bg-opacity-20 z-50 flex justify-center items-center ">
          <div className="opacity-100 shadow-lg border-black w-96 p-4 rounded-md bg-gray-100 dark:bg-cb-4 dark:text-gray-200 flex items-center flex-col p-10">
            <p className="mb-4 text-center">
              Posting a story with the same latest post will lead to overwrite
              of previous post. Do you wish to continue?
            </p>

            <button
              onClick={() => runValidateAndPublish(true)}
              className=" my-2 py-1 flex items-center justify-center rounded-md px-2 bg-custom-pink-1100 text-white font-bold hover:bg-green-400 transition cursor-pointer text-xs md:text-sm"
            >
              Continue
            </button>
            <button
              onClick={() => setPrompt(false)}
              className="flex items-center justify-center rounded-md px-2  text-gray-600 font-bold transition cursor-pointer text-xs md:text-sm"
            >
              Back
            </button>
          </div>
        </div>
      )}
      <div className="h-full">
        <button
          onBlur={() => {
            !lockDropdown && setActionMenu(false);
          }}
          onClick={() => setActionMenu(!actionMenu)}
          className="focus:outline-none dark:border-black relative  w-8 h-full flex items-center justify-center rounded-md px-2 text-white font-bold hover:bg-gray-300 transition cursor-pointer text-xs md:text-sm text-center"
        >
          <ActionSVG className="h-full fill-current text-gray-500 transform rotate-90" />
        </button>
        <div>
          {actionMenu && (
            <div
              onMouseLeave={() => setLockDropdown(false)}
              onMouseEnter={() => setLockDropdown(true)}
              className="absolute -bottom-24 left-0  bg-gray-100 dark:border-cb-4 text-gray-600 w-32 h-20 z-20 rounded flex flex-col overflow-hidden shadow-md"
            >
              <div
                onClick={() => {
                  setDeletePrompt(true);
                }}
                className="h-full border-b flex justify-center items-center dark:bg-cb-3 dark:border-cb-4 dark:text-gray-300 dark:hover:bg-red-600 dark:text-white hover:bg-pale-red-1 hover:text-white transition-all cursor-pointer"
              >
                Delete Space
              </div>
              <div
                onClick={() => {
                  setActionMenu(false);
                  setLockDropdown(false);
                }}
                className="h-full flex flex-col text-center justify-center items-center dark:bg-cb-3  dark:text-gray-300 dark:hover:bg-red-600 hover:bg-pale-red-1 dark:text-white  hover:text-white transition-all cursor-pointer"
              >
                placeholder**
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex h-full items-center">
        <div className="mx-2 text-gray-600 text-xs dark:text-gray-200">
          Last Published: {lastPublished}
        </div>
        <button
          onClick={() => runValidateAndPublish()}
          className=" h-full  flex items-center justify-center rounded-md px-2 bg-custom-pink-1100  dark:bg-cb-10  dark:border-black dark:hover:bg-cb-2 4 text-white font-bold hover:bg-green-400 transition cursor-pointer text-xs md:text-sm"
        >
          Publish
        </button>
      </div>
      {publishQueueMutation.isSuccess && (
        <div className="absolute px-2 top-0 left-0 rounded-md w-full h-full index-20 bg-green-200 flex justify-center items-center text-sm">
          <p>Successfully posted!</p>
          <button
            onClick={() => publishQueueMutation.reset()}
            className="absolute right-0 mx-2 py-0.5 px-1 rounded-md text-gray-800 index-20"
          >
            <CrossSVG className="fill-current" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Toolbar;
